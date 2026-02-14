import Orders from "../models/UserOrderHistoryModel.js";

export const getOrderHistoryUser = async (req, res) => {
    try {
        const userId = req.params.userId; // get userId from route params
        if (!userId) return res.status(400).json({ msg: "User ID is required" });

        const orders = await Orders.find({ user: userId }).populate('user', 'name email');
        
        res.status(200).json({ msg: "Orders fetched successfully", orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};
