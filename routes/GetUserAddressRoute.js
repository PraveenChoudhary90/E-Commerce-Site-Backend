

import express from "express";
import { getMyAddress } from "../controllers/GetUserAddressContoller.js";
import { userAuth } from "../middleware/authMiddleware.js";


const route = express.Router();

 
route.get("/getuseraddress/:userId",userAuth,getMyAddress)



export default route;