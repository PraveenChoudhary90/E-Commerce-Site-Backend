

import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { getBestSellersForClient, GetProductsUser } from "../controllers/GetProductsController.js";

const route  = express.Router();


route.get("/get-products", userAuth, GetProductsUser)

route.get("/get-best-seller-product",getBestSellersForClient);



export default route;