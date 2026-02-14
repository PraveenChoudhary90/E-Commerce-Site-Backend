import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";

// USER SIGNUP
export const userSignup = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      number,
      password: hashedPassword,
      role: "user", // always "user"
    });

    // Return token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER LOGIN
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // Return token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
