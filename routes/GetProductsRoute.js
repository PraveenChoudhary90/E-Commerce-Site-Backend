

import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { GetProductsUser } from "../controllers/GetProductsController.js";

const route  = express.Router();


route.get("/get-products", userAuth, GetProductsUser)





export default route;