import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import { CircleX } from "lucide-react"; // ✅ added import

const Checkout = () => {
  const {
    cart,
    navigate,
    currency,
    getCartTotal,
    axios,
    user,
    removeFromCart,
  } = useContext(AppContext); // ✅ assuming removeFromCart is available

  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(address[0]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  // console.log("address", address);

  const fetchAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");

      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]._id);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);

  const placeOrder = async () => {
    try {
      const { data } = await axios.post("/api/order/place", {
        items: cart,
        address: selectedAddress,
        totalAmount: getCartTotal(),
        paymentMethod,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="py-12 bg-[#0B482F] min-h-screen flex flex-col items-center"
      style={{ backgroundImage: `url(${assets.footer_img})` }}
    >
      <h1 className="text-4xl font-extrabold text-white text-center mb-8 tracking-wide">
        Checkout
      </h1>

      <div className="w-[95%] md:w-[85%] xl:w-[70%] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-start justify-between gap-10 transition-all duration-300 hover:shadow-2xl">
        {/* Left Section - Cart Summary */}
        <div className="flex-1 w-full">
          <h1 className="text-2xl font-semibold text-white mb-5 border-b border-white/30 pb-2">
            Cart Summary
          </h1>
          <div className="my-5 w-full p-4 rounded-lg bg-white text-gray-800 shadow-inner border border-gray-200 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:4000/uploads/${item.images[0]}`}
                    // src={item.images[0]}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <p className="font-medium">{item.name}</p>
                </div>

                {/* ✅ Price + Delete icon */}
                <div className="flex items-center gap-3">
                  <p className="text-lg font-semibold">
                    {currency}
                    {item.offerPrice}
                  </p>
                  <CircleX
                    className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                    size={22}
                    onClick={() => removeFromCart(item._id)}
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4 mt-4 border-t border-gray-300">
              <p className="font-semibold text-lg">Total:</p>
              <p className="text-xl font-bold text-green-700">
                {currency}
                {getCartTotal()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="text-white flex flex-col gap-6 w-full md:w-[40%] bg-white/10 border border-white/20 p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold border-b border-white/30 pb-2">
            Order Summary
          </h1>

          <div className="flex flex-col gap-4">
            <label htmlFor="address" className="font-medium">
              Select Address
            </label>
            <select
              className="w-full outline-none border border-primary p-2 rounded-md text-gray-800"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              {address?.map((item) => (
                <option
                  className="text-gray-800"
                  key={item._id}
                  value={item._id}
                >
                  {item.name} - {item.email} - {item.city} - {item.country} -{" "}
                  {item.state} - {item.zipCode}
                </option>
              ))}
            </select>

            <button
              onClick={() => navigate("/add-address")}
              className="bg-white text-primary font-medium cursor-pointer px-6 py-2 rounded-md shadow-md hover:bg-primary hover:text-white transition"
            >
              Add New Address
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="address" className="font-medium">
              Select Payment Method
            </label>
            <select
              className="w-full outline-none border border-primary p-2 rounded-md text-gray-800"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value={"cod"} className="text-gray-800">
                COD
              </option>
              <option value={"NetBanking"} className="text-gray-800">
                NetBanking
              </option>
              <option value={"UPI"} className="text-gray-800">
                UPI
              </option>
              <option value={"EMI"} className="text-gray-800" disabled>
                EMI
              </option>
            </select>
          </div>

          <button
            type="submit"
            onClick={placeOrder}
            className="bg-primary text-white font-semibold cursor-pointer px-6 py-3 rounded-md shadow-lg hover:scale-[1.03] transition-transform duration-200"
          >
            {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

// import { useContext, useEffect, useState } from "react";
// import { assets } from "../assets/assets.js";
// import { AppContext } from "../context/AppContext.jsx";
// import toast from "react-hot-toast";
// import { CircleX } from "lucide-react";
// import { loadStripe } from "@stripe/stripe-js"; // 💡 NEW IMPORT

// // 1. Load Stripe Promise with your Publishable Key
// // IMPORTANT: Replace 'pk_test_your_publishable_key_here' with your actual Stripe Publishable Key
// // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// const Checkout = () => {
//   const {
//     cart,
//     navigate,
//     currency,
//     getCartTotal,
//     axios,
//     user,
//     removeFromCart,
//   } = useContext(AppContext);

//   const [address, setAddress] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null); // Changed default to null for clarity
//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [loading, setLoading] = useState(false); // 💡 NEW: State to manage loading during payment

//   const fetchAddress = async () => {
//     try {
//       const { data } = await axios.get("/api/address/get");

//       if (data.success) {
//         setAddress(data.addresses);
//         if (data.addresses.length > 0) {
//           setSelectedAddress(data.addresses[0]._id);
//         }
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   // 1.1. Renamed original function for COD only
//   const placeOrderCOD = async () => {
//     if (!selectedAddress) return toast.error("Please select an address.");
//     setLoading(true);

//     try {
//       const { data } = await axios.post("/api/order/place", {
//         items: cart,
//         address: selectedAddress,
//         totalAmount: getCartTotal(),
//         paymentMethod: "cod", // Hardcoded for COD route
//       });

//       setLoading(false);
//       if (data.success) {
//         toast.success(data.message);
//         navigate("/my-orders");
//         // NOTE: Cart clearing should be done here if the backend doesn't handle it
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.response?.data?.message || "COD order failed.");
//     }
//   };

//   // 1.2. NEW FUNCTION: Handle the initiation of Stripe payment
//   const handleStripePayment = async () => {
//     if (!selectedAddress) return toast.error("Please select an address.");
//     setLoading(true);

//     let orderData = {};

//     // A. Create a PENDING order entry on your server
//     try {
//       const { data } = await axios.post("/api/order/place-pending", {
//         items: cart,
//         address: selectedAddress,
//         totalAmount: getCartTotal(),
//         paymentMethod, // e.g., 'NetBanking' or 'UPI'
//       });
//       if (data.success) {
//         orderData = data.order; // Assuming your server returns the new pending order object
//       } else {
//         setLoading(false);
//         return toast.error("Could not create pending order.");
//       }
//     } catch (error) {
//       setLoading(false);
//       return toast.error(
//         error.response?.data?.message || "Failed to reserve order."
//       );
//     }

//     // B. Call the backend to create the Stripe Checkout Session
//     try {
//       const response = await axios.post(
//         "/api/payment/create-checkout-session",
//         {
//           cart,
//           orderId: orderData._id, // Pass the newly created pending order ID
//           // Map currency symbol to Stripe currency codes
//           currency: currency === "₹" ? "inr" : "usd",
//         }
//       );

//       setLoading(false);
//       if (response.data.success && response.data.sessionUrl) {
//         // C. Redirect user to Stripe Hosted Checkout page
//         window.location.href = response.data.sessionUrl;
//         // NOTE: Do not show a success toast here. The payment is not yet confirmed.
//       } else {
//         toast.error(response.data.message || "Checkout session failed.");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Payment initiation error:", error);
//       toast.error("Could not initiate payment. Please try again.");
//     }
//   };

//   // 1.3. NEW FUNCTION: Main handler for the button click
//   const handleFinalOrder = () => {
//     if (paymentMethod === "cod") {
//       placeOrderCOD();
//     } else {
//       handleStripePayment(); // Handles all online payment methods
//     }
//   };

//   return (
//     <div
//       className="py-12 bg-[#0B482F] min-h-screen flex flex-col items-center"
//       style={{ backgroundImage: `url(${assets.footer_img})` }}
//     >
//       <h1 className="text-4xl font-extrabold text-white text-center mb-8 tracking-wide">
//         Checkout
//       </h1>

//       <div className="w-[95%] md:w-[85%] xl:w-[70%] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-start justify-between gap-10 transition-all duration-300 hover:shadow-2xl">
//         {/* Left Section - Cart Summary */}
//         <div className="flex-1 w-full">
//           <h1 className="text-2xl font-semibold text-white mb-5 border-b border-white/30 pb-2">
//             Cart Summary
//           </h1>
//           <div className="my-5 w-full p-4 rounded-lg bg-white text-gray-800 shadow-inner border border-gray-200 space-y-4">
//             {cart.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={`http://localhost:4000/uploads/${item.images[0]}`}
//                     // src={item.images[0]}
//                     alt=""
//                     className="w-16 h-16 object-cover rounded-md border"
//                   />
//                   <p className="font-medium">{item.name}</p>
//                 </div>

//                 {/* ✅ Price + Delete icon */}
//                 <div className="flex items-center gap-3">
//                   <p className="text-lg font-semibold">
//                     {currency}
//                     {item.offerPrice}
//                   </p>
//                   <CircleX
//                     className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
//                     size={22}
//                     onClick={() => removeFromCart(item._id)}
//                   />
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-between pt-4 mt-4 border-t border-gray-300">
//               <p className="font-semibold text-lg">Total:</p>
//               <p className="text-xl font-bold text-green-700">
//                 {currency}
//                 {getCartTotal()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Order Summary */}
//         <div className="text-white flex flex-col gap-6 w-full md:w-[40%] bg-white/10 border border-white/20 p-6 rounded-xl shadow-md">
//           <h1 className="text-2xl font-semibold border-b border-white/30 pb-2">
//             Order Summary
//           </h1>

//           <div className="flex flex-col gap-4">
//             <label htmlFor="address" className="font-medium">
//               Select Address
//             </label>
//             <select
//               className="w-full outline-none border border-primary p-2 rounded-md text-gray-800"
//               value={selectedAddress || ""} // Use empty string for better React control
//               onChange={(e) => setSelectedAddress(e.target.value)}
//             >
//               {address?.map((item) => (
//                 <option
//                   className="text-gray-800"
//                   key={item._id}
//                   value={item._id}
//                 >
//                   {item.name} - {item.email} - {item.city} - {item.country} -{" "}
//                   {item.state} - {item.zipCode}
//                 </option>
//               ))}
//               {!address ||
//                 (address.length === 0 && (
//                   <option disabled value="">
//                     No addresses found. Add one below.
//                   </option>
//                 ))}
//             </select>

//             <button
//               onClick={() => navigate("/add-address")}
//               className="bg-white text-primary font-medium cursor-pointer px-6 py-2 rounded-md shadow-md hover:bg-primary hover:text-white transition"
//               disabled={loading}
//             >
//               Add New Address
//             </button>
//           </div>

//           <div className="flex flex-col gap-4">
//             <label htmlFor="payment" className="font-medium">
//               Select Payment Method
//             </label>
//             <select
//               id="payment"
//               className="w-full outline-none border border-primary p-2 rounded-md text-gray-800"
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               disabled={loading}
//             >
//               <option value={"cod"} className="text-gray-800">
//                 Cash on Delivery (COD)
//               </option>
//               <option value={"stripe"} className="text-gray-800">
//                 Pay Online (Card/UPI/NetBanking)
//               </option>
//               {/* Optional: You can keep these as separate methods, but they will all use Stripe under the hood */}
//               {/* <option value={"NetBanking"} className="text-gray-800">NetBanking</option>
//               <option value={"UPI"} className="text-gray-800">UPI</option> */}
//               <option value={"EMI"} className="text-gray-800" disabled>
//                 EMI (Coming Soon)
//               </option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             onClick={handleFinalOrder} // 💡 UPDATED HANDLER
//             className="bg-primary text-white font-semibold cursor-pointer px-6 py-3 rounded-md shadow-lg hover:scale-[1.03] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             disabled={loading || cart.length === 0 || !selectedAddress}
//           >
//             {loading && (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             )}
//             {paymentMethod === "cod" ? "Place COD Order" : "Pay with Stripe"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

// // STRIPE_KEY=sk_test_51POvxESAr5iSahqBSInjKQ8KatNb7bhwwvemVvx53ZjlKHw9KU1xUaXJrXkIiEniQwGl4eM7thvgUfabMGikL8Hz00z5JLSTlQ
// // NEXT_PUBLIC_STRAPI_API_TOKEN=f15fc7ee2e1cb21cde2c73bcc93a67b26929376a621a0511a2a4a3803e4ed90008c2ce89108fdb246b198e57afc8ae096d01ec10d0ba62c3eb8959e063f4b8ca81ab26689126954b8f6f965050782d8526f4925de728a58967d0d6b18a8bcd587eb23a6cb02d95f5189dd19f97d92eb9533bd28ecb36a4b372d3e7bcf7465c3c

// // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51POvxESAr5iSahqBQXHSgq1x0Prym7qxBDHH3XaTld2GPsBjajs3JP0aSsYmbTci0J9OP4mz90D1V24bkZTfJhss00YkhbU3Lk
