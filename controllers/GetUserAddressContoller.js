import Address from "../models/PaymentModel.js";

// ✅ Get logged-in user's address
export const getMyAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ user: req.user._id });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      address,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};