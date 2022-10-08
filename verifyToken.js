const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({success: false, message: "you are not authenticated"});
        // const token = req.cookies.accessToken
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
            // console.log(user);
        } catch (e) {
            res.status(400).json({success: false, message: "Invalid token, please login again."});
        }  
}

const verifyTokenAndAuthorization = (req, res, next) =>{
    verifyToken(req, res, () =>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }else{
            // console.log(req.user)
            res.status(401).json({success: false, message : "You are not authorized to perform this action!"});
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) =>{
    verifyToken(req, res, () =>{
        if (req.user.isAdmin) {
            next();
        }else{
            // console.log(req.user)
            res.status(401).json({success: false, message : "You are not an admin!"});
        }
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}