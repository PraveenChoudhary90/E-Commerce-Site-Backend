

import express from "express";
import { getOrderHistoryUser} from "../controllers/GetOrderHistroyUserController.js";

const route = express.Router();

route.get("/order-history",getOrderHistoryUser)


export default route;