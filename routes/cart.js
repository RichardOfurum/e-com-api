const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken');
const CartController = require('../controllers/CartController');

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, CartController.create_cart);
router.put("/:id", verifyTokenAndAdmin,  CartController.update_cart);
router.delete("/:id", verifyTokenAndAuthorization,  CartController.delete_cart);
router.get("/find/:userId",  verifyTokenAndAuthorization, CartController.find_user_cart);
router.get("/", verifyTokenAndAdmin, CartController.get_all_carts);


module.exports = router