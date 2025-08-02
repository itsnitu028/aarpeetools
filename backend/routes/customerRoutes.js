import express from "express";
import { getProductId, getProducts, getProductsByCategory } from "../controller/productController.js";
import { getAllCategories, getCategoryById } from "../controller/categoryController.js"
// import { registerUser, loginUser, getAllUsers } from "../controllers/userController.js";
// import verifyToken from "../middleware/verifyToken.js"
// import checkAdmin from "../middleware/checkAdmin.js"

const router = express.Router();

// Customer routes - no authentication required
router.get("/products", getProducts);
router.get("/product/:id", getProductId);
router.get("/products/category/:categoryId", getProductsByCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

// router.post("/register", verifyToken, checkAdmin, registerUser);
// router.post("/login", loginUser); // login open to all
// router.get("/", verifyToken, checkAdmin, getAllUsers);

export default router;