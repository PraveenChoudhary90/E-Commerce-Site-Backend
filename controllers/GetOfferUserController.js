

import Offers from "../models/AddCuponModel.js";

export const  GetOfferUser = async(req,res)=>{
    try {
       const offer = await Offers.find();
       res.status(200).send(offer);
    } catch (error) {
        console.log(error);
    }
}