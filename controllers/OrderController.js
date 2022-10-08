const Order = require('../models/Order');
const {createOrderSchemaValidation, updateOrderSchemaValidation} = require('../validation/validationSchema');


const create_order = async (req, res) => {
    
    
    try {
        const result = await createOrderSchemaValidation.validateAsync(req.body);
        const newOrder = new Order(result);
        const savedOrder = await newOrder.save();

        if (savedOrder) {
            res.status(200).json({success: true, message: "created"});
        }else{
            res.status(401).json({success: true, message: "created saved"});
        }
        res.status(200).json({success: true, message: "created saved"});
    } catch (e) {
        res.status(500).json({success: false,  message: e.message})
        console.log(e.message);
    } 
}




const update_order = async (req, res) => {
    try {
        // res.json(req.cookies.accessToken)
            const result = await updateOrderSchemaValidation.validateAsync(req.body);
            
            const updateOrder = await Order.findByIdAndUpdate(req.params.id, 
                {
                    $set: result
                },

                {new: true}
            );
       
            if (updateOrder) {
                res.status(200).send({success: true, message: "order updated", data: updateOrder})
            }else{
                res.status(401).json({success: false, message: "order does not exist!"})
                // throw new SyntaxError(`user id does not exist!`);
            }
  
    } catch (e) {
        console.log(e.message);
        res.status(500).json({success:false, message:e.message});
    }
    
}


const delete_order = async(req, res) =>{
    try {
        if(await Order.findByIdAndDelete(req.params.id)){
            res.status(200).json({success: true, message:"order deleted"});
        }else{
            res.status(401).json({success: false, message:"order not found"});
        }
        
    } catch (e) {
        res.status(500).json(e.message);
    }
}

const find_user_orders = async(req, res) =>{
    try {
        const orders = await Order.findOne({userId: req.params.userId});
        if (orders) {
            res.status(200).json({success:true, message:"orders found", data: order});
        }else{
            res.status(401).json({success: false, message: 'orders not found'});
        }   
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}



const get_all_orders = async(req, res) =>{
    try {
        const qNew = req.query.new;
        
        const orders = qNew 
            ? await Order.find().sort({createdAt: -1}).limit(5)
            : await Order.find();

        if (orders) {
            console.log(orders)
            
            res.status(200).json({success:true, message:"order found", data: orders});
        }else{
            res.status(401).json({success:false, message:"no order found", data: orders});
            // throw new Error(`can not find user`);
        }   
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}

const get_monthly_income = async(req, res) =>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date.setMonth(lastMonth.getMilliseconds - 1));

    try {
        
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                    sales: $amount,
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: sales},
                }
            }
        ]);
       if (income) {
            res.status(200).json({success: true, message:"users stats fetched", data: income});
       }else{
            throw new Error(`income state not fund`);
       }
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}





module.exports = {
    create_order,
    create_order,
    update_order,
    delete_order,
    find_user_orders,
    get_all_orders,
    get_monthly_income
}