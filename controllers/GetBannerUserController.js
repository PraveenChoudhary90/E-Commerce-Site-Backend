

import BannerModel from "../models/AddBannerModel.js";

export const GetBannerUser = async(req,res)=>{
    try {
        const banner = await BannerModel.find();
        res.send(banner);
    } catch (error) {
        console.log(error);
    }
}