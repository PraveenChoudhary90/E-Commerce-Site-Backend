
import User from '../models/UserModel.js'; // apka User model


export const GetUserProfile = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};




export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // token middleware se aaya hua user ID
        const { name, email, phone } = req.body; // update karne wali fields

        // User ko ID se dhund ke update karo
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone },
            { new: true, runValidators: true } // updated document return kare
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
