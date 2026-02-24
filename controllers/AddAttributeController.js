import Attribute from "../models/AddAttributeModel.js";

// GET all attributes
export const getAllAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().populate("parentAttribute", "name");
    res.json(attributes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching attributes" });
  }
};

// CREATE new attribute
export const createAttribute = async (req, res) => {
  try {
    const { name, parentAttribute } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Attribute name is required" });
    }

    // Check duplicate under same parent only
    const existing = await Attribute.findOne({
      name: name.trim(),
      parentAttribute: parentAttribute || null,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "This attribute already exists under selected parent" });
    }

    const attr = new Attribute({
      name: name.trim(),
      parentAttribute: parentAttribute || null,
    });

    await attr.save();
    res.status(201).json(attr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating attribute" });
  }
};

// UPDATE attribute
export const updateAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentAttribute } = req.body;

    const attr = await Attribute.findById(id);
    if (!attr) return res.status(404).json({ message: "Attribute not found" });

    // Check duplicate on update under same parent
    if (name && name.trim()) {
      const existing = await Attribute.findOne({
        _id: { $ne: id },
        name: name.trim(),
        parentAttribute: parentAttribute || null,
      });

      if (existing) {
        return res
          .status(400)
          .json({ message: "This attribute already exists under selected parent" });
      }

      attr.name = name.trim();
    }

    if (parentAttribute !== undefined) attr.parentAttribute = parentAttribute || null;

    await attr.save();
    res.json(attr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating attribute" });
  }
};

// DELETE attribute
export const deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;

    // Detach children first
    await Attribute.updateMany({ parentAttribute: id }, { parentAttribute: null });

    await Attribute.findByIdAndDelete(id);
    res.json({ message: "Attribute deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting attribute" });
  }
};