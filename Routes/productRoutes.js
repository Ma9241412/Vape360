// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");

router.post("/create-product", productController.createProduct);
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", productController.updateProductById);
router.delete("/products/:id", productController.deleteProductById);

module.exports = router;
