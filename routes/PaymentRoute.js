

import express from "express";
import { createOrder, verifyPayment } from "../controllers/PaymentController.js";
import { userAuth } from "../middleware/authMiddleware.js";


const route = express.Router();


route.post("/create-order", userAuth,createOrder);
route.post("/verify-payment", userAuth,verifyPayment);


export default route;