

import express from "express";
import { createOrder, verifyPayment } from "../controllers/PaymentController.js";


const route = express.Router();


route.post("/create-order", createOrder);
route.post("/verify-payment", verifyPayment);


export default route;