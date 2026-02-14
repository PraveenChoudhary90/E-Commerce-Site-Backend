
import Product from "../models/AddProductModel.js"


export const GetProductsUser = async(req,res)=>{
    try {
       const product = await Product.find({isDeleted:false});
       res.send({msg:"Product get successfully", product})
    } catch (error) {
        console.log(error);
    }

}