import Banner from "../models/AddBannerModel.js";
import {imagekit} from "../utils/imagekit.js";

export const addBanner = async (req, res) => {
  try {
    const banners = req.body; // banners array with base64 images

    for (let banner of banners) {
      const uploadedUrls = [];

      // Upload each base64 image to ImageKit
      for (let base64 of banner.images) {
        try {
          const response = await imagekit.upload({
            file: base64, // base64 string
            fileName: `banner_${Date.now()}.jpg`,
          });
          uploadedUrls.push(response.url);
        } catch (err) {
          console.error("ImageKit upload error:", err);
        }
      }

      banner.images = uploadedUrls; // replace base64 with real URLs
    }

    const createdBanners = await Banner.insertMany(banners);
    res.status(201).json({ success: true, data: createdBanners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};






// Get all banners
export const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




export const BannerDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    res.status(200).json({ success: true, message: "Banner  deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4️⃣ Update banner by ID
export const BannerUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    let bannerData = req.body; // may contain new base64 images

    const existingBanner = await Banner.findById(id);
    if (!existingBanner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    // 1️⃣ Remove _id if exists
    if (bannerData._id) delete bannerData._id;

    // 2️⃣ Handle images: if new images provided, upload, else keep old
    if (bannerData.images && bannerData.images.length > 0) {
      const uploadedUrls = [];
      for (let base64 of bannerData.images) {
        try {
          const response = await imagekit.upload({
            file: base64,
            fileName: `banner_${Date.now()}.jpg`,
          });
          uploadedUrls.push(response.url);
        } catch (err) {
          console.error("ImageKit upload error:", err);
        }
      }
      bannerData.images = uploadedUrls;
    } else {
      bannerData.images = existingBanner.images;
    }

    // 3️⃣ Merge with existing data to prevent overwriting fields with undefined
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { $set: { ...bannerData } },
      { new: true, runValidators: true } // runValidators ensures schema validation
    );

    res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



