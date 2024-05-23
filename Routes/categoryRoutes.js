// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/create-category", categoryController.createCategory);
router.get("/get-all", categoryController.getAllCategories);
router.get("/getbyid/:id", categoryController.getCategoryById);
router.put("/update-category/:id", categoryController.updateCategoryById);
router.delete("/delete-category/:id", categoryController.deleteCategoryById);

module.exports = router;
