

import express from "express";
import { getOrderHistoryUser} from "../controllers/GetOrderHistroyUserController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const route = express.Router();

route.get("/order-history",userAuth,getOrderHistoryUser)


export default route;