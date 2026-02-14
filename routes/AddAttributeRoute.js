
import express from "express";
import { adminAuth } from "../middleware/authMiddleware.js";
import { createAttribute, deleteAttribute, getAllAttributes, updateAttribute } from "../controllers/AddAttributeController.js";

const route = express.Router();


route.post("/create-attribute", adminAuth, createAttribute);
route.get("/get-attribute", adminAuth, getAllAttributes);
route.delete("/delete/:id", adminAuth, deleteAttribute);
route.put("/update/:id", adminAuth, updateAttribute);





export default route;