import express from "express";
import { isAdmin } from "../middleware/isAdmin.js"; // Standard, reliable path
import { upload } from "../middleware/multer.js";   // Standard, reliable path
import {
  addProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controller.js"; // Standard, reliable path

const productRouter = express.Router();
// Routes are defined instantly when the file loads
productRouter.post("/add", upload.array("images"), isAdmin, addProduct); 
// ...
export default productRouter;
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// // Define path helpers once
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const parentDir = path.join(__dirname, '..'); 

// const productRouter = express.Router();

// // Helper to construct file URLs for dynamic import
// const getModuleUrl = (subpath) => 'file:///' + path.join(parentDir, subpath).replace(/\\/g, '/');

// // Use a simple array to hold the imported functions/middleware
// let addProduct, deleteProduct, getAllProducts, isAdmin, upload;

// // Use an Immediately Invoked Async Function Expression (IIAFE) to load modules
// (async function setupRoutes() {
//     try {
//         // Dynamic imports for the controller functions
//         ({ addProduct, deleteProduct, getAllProducts } = await import(getModuleUrl('controllers/product.controller.js')));
        
//         // Dynamic imports for the middleware (using the corrected 'middleware' folder)
//         ({ isAdmin } = await import(getModuleUrl('middleware/isAdmin.js')));
//         ({ upload } = await import(getModuleUrl('middleware/multer.js')));

//         // Define routes after modules are successfully loaded
//         productRouter.post("/add", upload.array("images"), isAdmin, addProduct);
//         productRouter.get("/all", getAllProducts);
//         productRouter.delete("/delete/:id", isAdmin, deleteProduct);

//     } catch (error) {
//         console.error("Failed to load product modules:", error);
//         process.exit(1);
//     }
// })();

// export default productRouter;