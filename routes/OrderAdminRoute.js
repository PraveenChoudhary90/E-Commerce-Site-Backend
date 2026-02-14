import express from "express";
import { adminAuth } from "../middleware/authMiddleware.js";
import { GetAllOrdersAdmin } from "../controllers/OrdersAdminController.js";


const route = express.Router();


route.get("/get-order-details",adminAuth,GetAllOrdersAdmin);




export default route;