import express from "express";
import { adminAuth } from "../middleware/authMiddleware.js";
import { addProduct, DeleteProduct, getProducts, updateBestSellerStatus, updateProduct } from "../controllers/AddProductController.js";
import { upload } from "../utils/upload.js";



const route = express.Router();



route.post("/create-product",adminAuth,upload.array("images",5) ,addProduct)
route.get("/get-product-details", adminAuth, getProducts);
route.delete("/delete-product/:id",adminAuth, DeleteProduct);
route.put("/update-product/:id", adminAuth, upload.array("images",5),updateProduct);

route.put("/best-selling-product/:id", adminAuth, updateBestSellerStatus);


export default route;