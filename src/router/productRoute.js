import express from "express";
import {
  getProducts,
  getProductsByid,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.js";
import {
  deleteDetailProduct,
  getDetail,
  saveProductDetail,
  updateProductDetail,
} from "../controller/productDetail.js";
import { getUser, Register, Login, logOut } from "../controller/users.js";
import verifyToken from "../midleware/index.js";
import { refreshToken } from "./verifyToken.js";
import { isVerify } from "../controller/VerifyEmail.js";



const router = express.Router();

// router Product
router.get("/products", getProducts);
router.get("/products/:id", getProductsByid);
router.post("/products",verifyToken, saveProduct);
router.patch("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id",verifyToken, deleteProduct);

// router ProductDetail
router.get("/detail", getDetail);
router.post("/detail/:id", verifyToken, saveProductDetail);
router.patch("/detail/:id", verifyToken, updateProductDetail);
router.delete("/detail/:id", verifyToken, deleteDetailProduct);

// router Users
router.get("/data", verifyToken, getUser);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logOut);

// // router verifyEmail 
router.post("/verify/:uniqueId", isVerify )

export default router;
