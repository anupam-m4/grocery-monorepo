import express from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {upload} from '../middleware/multer.js'

const categoryRouter = express.Router();

categoryRouter.post("/add", isAdmin, upload.single("image"), createCategory);
categoryRouter.get("/all", getCategories);
categoryRouter.delete("/delete/:id", isAdmin, deleteCategory);
export default categoryRouter;
