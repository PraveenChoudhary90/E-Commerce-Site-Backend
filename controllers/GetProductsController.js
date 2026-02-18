
import Product from "../models/AddProductModel.js"


export const GetProductsUser = async(req,res)=>{
    try {
       const product = await Product.find({isDeleted:false});
       res.send({msg:"Product get successfully", product})
    } catch (error) {
        console.log(error);
    }

}




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
