import Feedback from "../models/UserFeedBackModel.js";

// Get all feedbacks (admin)
export const getAllFeedbacksAdmin = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete feedback by ID (admin)
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update feedback by ID (admin)
export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, feedback } = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { name, email, feedback },
      { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback updated successfully", data: updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};