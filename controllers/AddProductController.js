import Product from "../models/AddProductModel.js";
import {imagekit} from "../utils/imagekit.js";

// Add product with file upload
export const addProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      brand,
      product_category,
      gst_in_percentage,
      product_mrp,
      user_price,
      description,
      attributes,
    } = req.body;

    if (!productId || !name || !product_mrp || !user_price || !description) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const uploadedImages = [];

    // req.files contains array of files from Multer
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const upload = await imagekit.upload({
          file: file.buffer, // buffer from Multer
          fileName: `${productId}-${Date.now()}.${file.originalname.split(".").pop()}`,
        });
        uploadedImages.push(upload.url);
      }
    }

    const newProduct = await Product.create({
      productId,
      name,
      brand,
      product_category,
      gst_in_percentage: Number(gst_in_percentage) || 0,
      product_mrp: Number(product_mrp),
      user_price: Number(user_price),
      description,
      attributes: JSON.parse(attributes || "[]"), // if sent as string
      images: uploadedImages,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ message: err.message });
  }
};





// 🔹 GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate("product_category", "name") // optional: populate category names
      .populate("attributes.attribute", "name") // optional: populate attribute names
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔹 GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("product_category", "name")
      .populate("attributes.attribute", "name");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};







// 🔹 UPDATE PRODUCT WITH IMAGEKIT (supports multiple images + index-wise delete)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { existingImages } = req.body; // frontend se JSON string me aa rahi hai
    const existingImagesArray = existingImages ? JSON.parse(existingImages) : [];

    const updateData = {
      ...req.body,
      images: existingImagesArray, // Start with remaining existing images
    };

    // Upload new images to ImageKit if provided
    if (req.files && req.files.length > 0) {
      const uploadedImages = [];
      for (const file of req.files) {
        const uploadResult = await imagekit.upload({
          file: file.buffer,
          fileName: `${file.originalname}-${Date.now()}`,
        });
        uploadedImages.push(uploadResult.url);
      }
      // Add new uploaded images to existingImages
      updateData.images = [...updateData.images, ...uploadedImages];
    }

    // Update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updateData,
      { new: true }
    )
      .populate("product_category", "name")
      .populate("attributes.attribute", "name");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// 🔹 SOFT DELETE PRODUCT
export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isDeleted = true;
    await product.save();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};








// Update Best Seller status
export const updateBestSellerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBestSeller } = req.body;

    if (typeof isBestSeller !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid value for isBestSeller" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { isBestSeller },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Optional: return all products (like a list)
    const allProducts = await Product.find({ isDeleted: false });

    res.status(200).json({
      success: true,
      count: allProducts.length,
      data: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
