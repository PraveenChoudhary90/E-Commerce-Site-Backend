
import Product from "../models/AddProductModel.js"


export const GetProductsUser = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate({
        path: "product_category", // reference field
        select: "name description", // jo fields chahiye
      })
      .populate({
        path: "attributes.attribute", // agar attributes me reference hai
        select: "name",
      });

    res.status(200).send({
      msg: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({
      msg: "Server error while fetching products",
      error: error.message,
    });
  }
};





// Get Best Seller products for client
export const getBestSellersForClient = async (req, res) => {
  try {
    // Sirf active (isDeleted: false) aur best seller products
    const bestSellers = await Product.find({ 
      isBestSeller: true, 
      isDeleted: false 
    }).sort({ updatedAt: -1 }); // newest first, optional

    res.status(200).json({
      success: true,
      count: bestSellers.length,
      data: bestSellers,
    });
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
