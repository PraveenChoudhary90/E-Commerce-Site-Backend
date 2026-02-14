// authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// 🔹 Common function to verify token and fetch user
const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;
//   console.log("AUTH HEADER =>", req.headers.authorization);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw { status: 401, message: "No token provided" };
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw { status: 401, message: "Token invalid or expired" };
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw { status: 401, message: "Unauthorized user" };
  }

  return user;
};

// 🔹 Middleware for normal users
export const userAuth = async (req, res, next) => {
  try {
    const user = await verifyToken(req);

    if (user.role !== "user") {
      return res.status(403).json({ message: "Access denied: only users allowed" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({ message: error.message || "Unauthorized" });
  }
};

// 🔹 Middleware for admins
export const adminAuth = async (req, res, next) => {
  try {
    const user = await verifyToken(req);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: only admins allowed" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({ message: error.message || "Unauthorized" });
  }
};
