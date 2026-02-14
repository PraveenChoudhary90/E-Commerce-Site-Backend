
import express from "express";
import { Addcategory, deleteCategory, editCategory, getCategories } from "../controllers/AddcategoryController.js";
import { adminAuth } from "../middleware/authMiddleware.js";
import { upload } from "../utils/upload.js";


const route = express.Router();


route.post("/create-category",adminAuth, upload.single("image"),Addcategory);
route.get("/get-categories", adminAuth,getCategories);
route.delete("/delete-category/:id", adminAuth,deleteCategory);
route.post("/edit-category/:id", adminAuth, upload.single("image"), editCategory);






export default route;