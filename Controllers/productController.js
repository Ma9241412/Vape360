// controllers/productController.js
const Product = require("../Models/productModel");
const upload = require("../config/multerconfig");

// Create a new product
exports.createProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ message: "No file selected!" });
      } else {
        try {
          const { name, description, price, quantity, category } = req.body;
          const image = req.file.filename;
          const newProduct = new Product({
            name,
            description,
            image,
            price,
            quantity,
            category,
          });
          const savedProduct = await newProduct.save();
          res.status(201).json(savedProduct);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    }
  });
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProductById = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      try {
        const { name, description, price, quantity, category } = req.body;
        let updateData = { name, description, price, quantity, category };

        if (req.file) {
          updateData.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true, runValidators: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  });
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
