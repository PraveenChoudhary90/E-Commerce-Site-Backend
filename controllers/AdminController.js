import Admin from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";

// ADMIN LOGIN ONLY
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // Return token
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      number:admin.number,
      role: admin.role, // always "admin"
      token: generateToken(admin._id, admin.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
