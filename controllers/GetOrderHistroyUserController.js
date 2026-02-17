import Orders from "../models/PaymentModel.js";

export const getOrderHistoryUser = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json({ msg: "Orders fetched successfully", orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};
