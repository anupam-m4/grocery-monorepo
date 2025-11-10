import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe"; // 💡 Changed from require()
import OrderModel from "../models/order.model.js"; // 💡 Added .js extension
import UserModel from "../models/user.model.js"; // 💡 Added .js extension

// Initialize Stripe client using the secret key from the environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

// Helper function to format cart items into Stripe's line item format
const formatLineItems = (cartItems, currency) => {
    return cartItems.map(item => ({
        price_data: {
            currency: currency.toLowerCase(),
            product_data: {
                name: item.name,
                // Adjust the image path if necessary
                images: item.images && item.images.length > 0 ? [`http://localhost:4000/uploads/${item.images[0]}`] : [], 
            },
            // Convert price to the smallest currency unit (e.g., paise for INR, cents for USD)
            unit_amount: Math.round(item.offerPrice * 100), 
        },
        quantity: 1, // Adjust if your cart includes a 'quantity' field
    }));
};

// 1. Creates the Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
    try {
        const { cart, orderId, currency } = req.body; 

        if (!cart || cart.length === 0 || !orderId) {
            return res.status(400).json({ success: false, message: "Missing cart data or order ID." });
        }

        const line_items = formatLineItems(cart, currency);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "upi"], // Common payment methods
            line_items,
            mode: "payment",
            
            // CRITICAL: Replace 5173 with your frontend running port if different
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`, 
            cancel_url: `http://localhost:5173/checkout`, 
            
            // Pass your pending order ID to the webhook listener
            metadata: {
                orderId: orderId.toString(),
            },
        });

        res.status(200).json({ 
            success: true, 
            sessionUrl: session.url // Send the secure URL back to the frontend
        });

    } catch (error) {
        console.error("Error creating Stripe session:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to create checkout session. " + error.message 
        });
    }
};

// 2. Handles Webhook events from Stripe (Secure Confirmation)
export const handleStripeWebhook = async (req, res) => {
    // Get the signature header and the webhook secret from the environment
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; 

    let event;

    try {
        // Verify the webhook signature against the raw body
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`⚠️ Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.metadata.orderId;

        try {
            const order = await OrderModel.findById(orderId);
            if (!order) {
                // If we can't find the order, still return 200 to Stripe so it doesn't retry
                return res.json({ received: true, message: "Order ID not found in DB but webhook processed." }); 
            }

            // Update the Order Status only if payment is confirmed
            if (session.payment_status === 'paid') {
                order.paymentStatus = 'Paid';
                order.status = 'Processing'; 
                await order.save();

                // Clear the user's cart after successful payment confirmation
                await UserModel.findByIdAndUpdate(order.user, { cart: [] });

                console.log(`✅ Order ${orderId} successfully marked as Paid and Processing.`);
            } else {
                order.paymentStatus = 'Failed';
                await order.save();
                console.log(`❌ Payment failed for Order ${orderId}.`);
            }
        } catch (error) {
            console.error("Error processing order update:", error);
            return res.status(500).send('Database update failed.');
        }
    }

    // Acknowledge receipt of the event
    res.json({ received: true });
};



// import Stripe from 'stripe';
// import Order from '../models/order.model.js';
// // Make sure to adjust the path if your Order model is located elsewhere

// // 1. Initialize Stripe (Ensure your ENV VAR is loaded)
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Helper function to format cart items for Stripe (CRITICAL FIX)
// const formatLineItems = (cartItems, currency, totalAmount) => {
//     // Note: Stripe requires a total amount to be charged. 
//     // We usually charge the total in one line item to avoid rounding issues,
//     // but here we map the individual products to provide itemized detail.

//     if (!cartItems || cartItems.length === 0) {
//         // Fallback or error handling if cart is empty
//         throw new Error("Cannot create checkout session with an empty cart.");
//     }

//     return cartItems.map(item => {
//         // Use the offer price if available, otherwise use the regular price
//         const itemPrice = item.offerPrice || item.price; 
        
//         // 💡 CRITICAL: Multiply by 100 and use Math.round to ensure it's an integer 
//         // representing the value in the smallest currency unit (e.g., cents/paise).
//         const unitAmount = Math.round(itemPrice * 100);

//         if (unitAmount <= 0) {
//             // Stripe will crash if amount is <= 0. Throw an error for debugging.
//             throw new Error(`Invalid item price (${itemPrice}) for product ${item.name}.`);
//         }

//         return {
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: item.name,
//                     // Use a placeholder image if necessary, as Stripe needs a public URL
//                     images: item.images ? [`http://localhost:4000/uploads/${item.images[0]}`] : ['https://placehold.co/100x100/10B981/ffffff?text=Product'], 
//                 },
//                 unit_amount: unitAmount,
//             },
//             quantity: item.quantity || 1, // Default to 1 if quantity is missing
//         };
//     });
// };


// export const createCheckoutSession = async (req, res) => {
//     try {
//         const { cart, orderId, currency } = req.body;
        
//         // Check if the order we created in the previous step exists
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ success: false, message: "Order not found for checkout." });
//         }
        
//         // 2. Format line items for Stripe
//         const line_items = formatLineItems(cart, currency, order.totalAmount);

//         const session = await stripe.checkout.sessions.create({
//             customer_email: req.user.email, // Use the authenticated user's email
//             payment_method_types: ['card'], // Default payment methods
//             line_items,
//             mode: 'payment',
//             // Success URL needs the order ID to update the frontend state
//             success_url: `${process.env.FRONTEND_URL}/verify-payment?success=true&orderId=${orderId}`, 
//             // Cancel URL redirects back to the checkout page
//             cancel_url: `${process.env.FRONTEND_URL}/checkout`, 
//             // Metadata is CRITICAL for the Webhook to identify the order
//             metadata: {
//                 orderId: orderId.toString(),
//                 userId: req.user.id.toString(),
//             },
//         });

//         // Redirect the user via the session URL
//         return res.json({ success: true, sessionUrl: session.url });

//     } catch (error) {
//         console.error("Stripe Checkout Error:", error.message);
//         // If Stripe throws an error (e.g., invalid currency, negative price), 
//         // return a 400 error instead of a generic 500 server crash.
//         return res.status(400).json({ 
//             success: false, 
//             message: "Failed to create Stripe session.",
//             details: error.message 
//         });
//     }
// };