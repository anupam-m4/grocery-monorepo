import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
const orderRouter = express.Router();
// USER
orderRouter.post("/place", isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getUserOrders);
// ADMIN
orderRouter.get("/all", isAdmin, getAllOrders);
orderRouter.put("/status/:orderId", isAdmin, updateOrderStatus);

export default orderRouter;

// import express from "express";
// import { isAuth } from "../middleware/isAuth.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import {
//   getAllOrders,
//   getUserOrders,
//   placeOrder,
//   updateOrderStatus,
//   placePendingOrder, // 💡 NEW: Import the pending order function
// } from "../controllers/order.controller.js";

// const orderRouter = express.Router();

// // USER
// orderRouter.post("/place", isAuth, placeOrder);
// // 💡 ADD THIS NEW ROUTE
// orderRouter.post("/place-pending", isAuth, placePendingOrder); 
// orderRouter.get("/my-orders", isAuth, getUserOrders);

// // ADMIN
// orderRouter.get("/all", isAdmin, getAllOrders);
// orderRouter.put("/status/:orderId", isAdmin, updateOrderStatus);

// export default orderRouter;