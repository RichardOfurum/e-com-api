const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

router.post("/", verifyTokenAndAuthorization, OrderController.create_order);
router.put("/:id", verifyTokenAndAdmin,  OrderController.update_order);
router.delete("/:id", verifyTokenAndAdmin,  OrderController.delete_order);
router.get("/find/:userId",  verifyTokenAndAuthorization, OrderController.find_user_orders);
router.get("/", verifyTokenAndAuthorization, OrderController.get_all_orders);
router.get("/income", verifyTokenAndAuthorization, OrderController.get_monthly_income);


module.exports = router