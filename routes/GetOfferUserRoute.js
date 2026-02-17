

import express from "express";
import { GetOfferUser } from "../controllers/GetOfferUserController.js";

const route = express.Router();

route.get("/get-offer", GetOfferUser)



export default route;
