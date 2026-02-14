import Coupon from "../models/AddCuponModel.js";
import SpecialOffer from "../models/AddRewadsModel.js";

// Create Coupon
export const createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Coupons
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update Coupon
export const updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCoupon) return res.status(404).json({ success: false, message: "Coupon not found" });
    res.json({ success: true, data: updatedCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Coupon
export const deleteCoupon = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ success: false, message: "Coupon not found" });
    res.json({ success: true, message: "Coupon deleted (soft delete)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ------------------ Special Offer ------------------

// Create Special Offer
export const createSpecialOffer = async (req, res) => {
  try {
    const offer = new SpecialOffer(req.body);
    await offer.save();
    res.status(201).json({ success: true, data: offer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Special Offers
export const getAllSpecialOffers = async (req, res) => {
  try {
    const offers = await SpecialOffer.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, data: offers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSpecialOffer = async (req, res) => {
  try {
    const deleted = await SpecialOffer.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ success: false, message: "Offer not found" });
    res.json({ success: true, message: "Special Offer deleted (soft delete)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update Special Offer
export const updateSpecialOffer = async (req, res) => {
  try {
    const updatedOffer = await SpecialOffer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedOffer) return res.status(404).json({ success: false, message: "Offer not found" });
    res.json({ success: true, data: updatedOffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
