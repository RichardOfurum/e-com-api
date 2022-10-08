const User = require('../models/User');
const bcrypt = require('bcrypt');
const {updatePasswordSchemaValidation} = require('../validation/validationSchema');
const e = require('express');
const { json } = require('express');

const update_user_password = async (req, res) => {
    try {
        // res.json(req.cookies.accessToken)
            const result = await updatePasswordSchemaValidation.validateAsync(req.body);
            const hash = bcrypt.hashSync(result.password, 8);

            // res.status(200).json(req.params.id)
            const updateUser = await User.findByIdAndUpdate(req.params.id, 
                {
                    $set: {password:hash}
                },

                {new: true}
            );
       
            if (updateUser) {
                res.status(200).send({success: true, message: "user updated"})
            }else{
                // res.status(401).json({success: false, message: "user id does not exist!"})
                // throw new SyntaxError(`user id does not exist!`);
            }
        // res.status(200).json(updateUser);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({success:false, message:e.message});
    }
    
}


const delete_user = async(req, res) =>{
    try {
        if(await User.findByIdAndDelete(req.params.id)){
            res.status(200).json({success: true, message:"user deleted"});
        }else{
            res.status(401).json({success: false, message:"user not found"});
        }
        
    } catch (error) {
        res.status(500).json(err);
    }
}

const find_user = async(req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const {password, ...others} = user._doc;
            res.status(200).json({success:true, message:"user found", data: others});
        }else{
            throw new Error(`can not find user`);
        }   
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}

const get_all_user = async(req, res) =>{
    try {
        const query = req.query.new;
        const users = query? await User.find({}, {password: 0}).limit(5).sort({_id: -1}): await User.find();
        if (users) {
            console.log(users)
            
            res.status(200).json({success:true, message:"users found", data: users});
        }else{
            throw new Error(`can not find user`);
        }   
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}


const get_users_stats = async(req, res) =>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    try {
        
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month: {$month: "$createdAt"}
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1},
                }
            }
        ]);
       if (data) {
            res.status(200).json({success: true, message:"users stats fetched", data: data});
       }else{
            throw new Error(`use state not fund`);
       }
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }

}



module.exports = {
    update_user_password,
    delete_user,
    find_user,
    get_all_user,
    get_users_stats
}