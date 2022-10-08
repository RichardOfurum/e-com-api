const User = require('../models/User');
const Cart = require('../models/Cart');
const {registerSchemaValidation, loginSchemaValidation} = require('../validation/validationSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {genarateToken} = require('../genarateTokenAndCookie')
// const cookieParser = require('cookie-parser');

const auth_register = async (req, res) => {
    try {
        if (req.body.password !== req.body.repeat_password) {
            throw new Error(`Password do not match`);
        }

        //validating the body request
        const result = await registerSchemaValidation.validateAsync(req.body);

        const doesExistEmail = await User.findOne({email: result.email});
        const doesExistUsername = await User.findOne({username: result.username});

        if (doesExistEmail) {
            throw new Error(`the email ${result.email} already exist`);
        }

        if (doesExistUsername) {
            throw new Error(`the username ${result.username} already exist`);
        }

        const hash = bcrypt.hashSync(result.password, 8);

        result.password = hash;
        const user = new User(result);
        const savedUser = await user.save();

        if (savedUser) {
            const cart = new Cart({userId: user._id});
            const saveCart = await cart.save();
        }

        // const {password, ...others} = savedUser._doc;

        const data = {id: user._id, isAdmin: user.isAdmin}
        const message = "Account created!";
        genarateToken(data, 200, res, message);

        const newUser = new User({});
    } catch (e) {
        console.log(e.message);
        res.status(500).json(e.message);
    }
    
}

const auth_logout = async (req, res) =>{
    try {
        res.status(202).clearCookie('accessToken').json("You are loged out");
    } catch (error) {
        res.status(401).json("logout error")
        console.log(error.message);
    }
}

const auth_login = async (req, res) => {

    try{
        
        const result = await loginSchemaValidation.validateAsync(req.body);
        const user = await User.findOne({email: result.email});
        if (!user) {
            throw new SyntaxError(`${result.email} does not exist, please check the email and type again`);
        }

        const validPass = await bcrypt.compare(result.password , user.password);
        if (!validPass) {
            res.status(401).json({success: false, message: "Please enter the correct password"});
            // throw new SyntaxError ("Please enter the correct password");
        }else{
            // const {password, ...others} = user._doc;

            const data = {id: user._id, isAdmin: user.isAdmin}
        
            const message = "You are loged in!";
            genarateToken(data, 200, res, message);
        }

        
  
    }catch(e){
        res.status(500).json(e.message);
    }

}

module.exports = {
    auth_register,
    auth_login,
    auth_logout
}