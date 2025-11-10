import express from "express";
import {
  adminLogin,
  adminLogout,
  checkAdmin,
} from "../controllers/admin.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/logout", adminLogout);
adminRouter.get("/is-admin", isAdmin, checkAdmin);

export default adminRouter;