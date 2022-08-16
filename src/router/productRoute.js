import  express  from "express";
import { getProducts, getProductsByid, saveProduct, updateProduct, deleteProduct } from "../controller/product.js";
import { deleteDetailProduct, getDetail, saveProductDetail, updateProductDetail } from "../controller/productDetail.js";
const router = express.Router()

router.get('/products', getProducts);
router.get('/products/:id', getProductsByid);
router.post('/products', saveProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/detail', getDetail)
router.post('/detail/:id', saveProductDetail)
router.put('/detail/:id', updateProductDetail)
router.delete('/detail/:id', deleteDetailProduct)



export default router;