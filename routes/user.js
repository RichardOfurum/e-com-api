const express = require('express');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken');
const UserController = require('../controllers/UserController');



const router = express.Router();

router.put("/:id", verifyTokenAndAuthorization,  UserController.update_user_password);
router.delete("/:id", verifyTokenAndAdmin,  UserController.delete_user);
router.get("/find/:id",  verifyToken, UserController.find_user);
router.get("/",  verifyToken, UserController.get_all_user);
router.get("/stats",  UserController.get_users_stats);

module.exports = router