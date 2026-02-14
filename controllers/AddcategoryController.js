import Category from "../models/AddcategoryModel.js";
import { imagekit } from "../utils/imagekit.js"; // aapka ImageKit setup

export const Addcategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Category name is required" });
    if (!req.file) return res.status(400).json({ message: "Category image is required" });

    // Upload image to ImageKit
    const uploadResult = await imagekit.upload({
      file: req.file.buffer, // memory buffer
      fileName: req.file.originalname,
      folder: "/categories", // optional folder
    });

    // Save category in DB
    const newCategory = new Category({
      name: name.trim(),
      image: uploadResult.url,
      isDeleted: false,
    });

    await newCategory.save();

    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Addcategory error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};



// ================= Get All Categories =================
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (error) {
    console.error("getCategories error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// ================= Edit / Update Category =================
export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Category name is required" });

    const category = await Category.findById(id);
    if (!category || category.isDeleted) return res.status(404).json({ message: "Category not found" });

    // Update image if a new file is uploaded
    if (req.file) {
      const uploadResult = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/categories",
      });
      category.image = uploadResult.url;
    }

    category.name = name.trim();
    await category.save();

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("editCategory error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// ================= Soft Delete Category =================
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category || category.isDeleted) return res.status(404).json({ message: "Category not found" });

    category.isDeleted = true;
    await category.save();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("deleteCategory error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
