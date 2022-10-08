const jwt = require('jsonwebtoken');


const genarateToken = async(data, statusCode, res, message) =>{

    try {
        const accessToken = await jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"3d"});
  
        const options = {
            sameSite:'strict', 
            path: '/', 
            expires:new Date(new Date().getTime() + 1000 * 1000 * 1000 ),
            httpOnly: true, 
            // expires: new Date(Date.now() + process.env.EXPIRE_TOKEN)
        };

        res.status(statusCode).cookie("accessToken", accessToken, options).json({success: true, message: message});

        
    } catch (e) {
        console.log(e.message);
        res.send(e.message)
    }
}

module.exports = {
    genarateToken
}