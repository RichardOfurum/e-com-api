const express = require('express');
// const {auth_register, auth_login} = require('../controllers/AuthController');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post("/register", AuthController.auth_register);
router.post("/login", AuthController.auth_login);
router.get("/logout", AuthController.auth_logout);


module.exports = router