import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/UserModel.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminName = process.env.ADMIN_NAME;
    const adminNumber = process.env.ADMIN_NUMBER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    }

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("Admin user already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin
    const admin = await Admin.create({
      name: adminName || "Admin",
      email: adminEmail,
      number: adminNumber || "9999999999",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully:");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();
