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



const router = express.Router();

// router Product
router.get("/products", getProducts);
router.get("/products/:id", getProductsByid);
router.post("/products", saveProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// router ProductDetail
router.get("/detail", getDetail);
router.post("/detail/:id", saveProductDetail);
router.put("/detail/:id", updateProductDetail);
router.delete("/detail/:id", deleteDetailProduct);

// router Users
router.get("/data", verifyToken, getUser);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logOut);

export default router;
