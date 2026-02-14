import express from "express";
import { userSignup, userLogin } from "../controllers/UserController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const route = express.Router();

// Signup & login routes for normal users
route.post("/signup",userSignup);
route.post("/login", userLogin);

route.get("/dashboard", userAuth, (req, res) => {
  res.json({ message: `Welcome user ${req.user.name}` });
})

export default route;
