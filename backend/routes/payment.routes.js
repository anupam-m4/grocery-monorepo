import express from "express";
import { createCheckoutSession, handleStripeWebhook } from "../controllers/payment.controller.js"; 
import { isAuth } from "../middleware/isAuth.js"; 

const router = express.Router();

// POST request to create a checkout session (protected by authentication)
router.post("/create-checkout-session", isAuth, createCheckoutSession);

// 💡 Stripe Webhook Route
// express.raw({type: 'application/json'}) is essential to get the raw body for signature verification
router.post('/webhook', express.raw({type: 'application/json'}), handleStripeWebhook); 

export default router;