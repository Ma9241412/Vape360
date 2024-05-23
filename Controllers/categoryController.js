const Category = require("../models/categoryModel");
const upload = require("../config/multerconfig");

// Create a new category
exports.createCategory = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ message: "No file selected!" });
      } else {
        try {
          const { name } = req.body;
          const image = req.file.filename; // Save only the filename
          const newCategory = new Category({ name, image });
          const savedCategory = await newCategory.save();
          res.status(201).json(savedCategory);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    }
  });
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID
exports.updateCategoryById = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      try {
        const { name } = req.body;
        let updateData = { name };

        if (req.file) {
          updateData.image = req.file.filename;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true, runValidators: true }
        );

        if (!updatedCategory) {
          return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(updatedCategory);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  });
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
