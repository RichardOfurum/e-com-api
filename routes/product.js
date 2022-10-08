const express = require('express');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.post("/", verifyTokenAndAdmin, ProductController.create_product);
router.put("/:id", verifyTokenAndAdmin,  ProductController.update_produtct);
router.delete("/:id", verifyTokenAndAdmin,  ProductController.delete_product);
router.get("/find/:id",  verifyToken, ProductController.find_product);
router.get("/",  ProductController.get_all_products);
// router.get("/stats",  UserController.get_users_stats);


module.exports = router