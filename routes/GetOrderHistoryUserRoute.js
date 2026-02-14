

import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { getOrderHistoryUser} from "../controllers/GetOrderHistroyUserController.js";

const route = express.Router();

route.get("/order-history/:userId", userAuth, getOrderHistoryUser)


export default route;