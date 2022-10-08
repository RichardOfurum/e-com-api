const Cart = require('../models/Cart');
const {createCartSchemaValidation, updateCartSchemaValidation} = require('../validation/validationSchema');


const create_cart = async (req, res) => {
    
    
    try {
        const result = await createCartSchemaValidation.validateAsync(req.body);
        const newCart = new Cart(result);
        const savedCart = await newCart.save();
        res.status(200).json({success: true, message: "created saved"});
    } catch (e) {
        res.status(500).json({success: false,  message: e.message})
        console.log(e.message);
    } 
}




const update_cart = async (req, res) => {
    try {
        // res.json(req.cookies.accessToken)
            const result = await updateCartSchemaValidation.validateAsync(req.body);
            
            const updateCart = await Cart.findByIdAndUpdate(req.params.id, 
                {
                    $set: result
                },

                {new: true}
            );
       
            if (updateCart) {
                res.status(200).send({success: true, message: "cart updated", data: updateCart})
            }else{
                res.status(401).json({success: false, message: "cart does not exist!"})
                // throw new SyntaxError(`user id does not exist!`);
            }
  
    } catch (e) {
        console.log(e.message);
        res.status(500).json({success:false, message:e.message});
    }
    
}


const delete_cart = async(req, res) =>{
    try {
        if(await Cart.findByIdAndDelete(req.params.id)){
            res.status(200).json({success: true, message:"Cart deleted"});
        }else{
            res.status(401).json({success: false, message:"Cart not found"});
        }
        
    } catch (e) {
        res.status(500).json(e.message);
    }
}

const find_user_cart = async(req, res) =>{
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        if (cart) {
            res.status(200).json({success:true, message:"cart found", data: cart});
        }else{
            res.status(401).json({success: false, message: 'cart not found'});
        }   
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}



const get_all_carts = async(req, res) =>{
    try {
        const qNew = req.query.new;
        
        const carts = qNew 
            ? await Cart.find().sort({createdAt: -1}).limit(5)
            : await Cart.find();

        if (carts) {
            console.log(carts)
            
            res.status(200).json({success:true, message:"cart found", data: carts});
        }else{
            res.status(401).json({success:false, message:"no cart found", data: carts});
            // throw new Error(`can not find user`);
        }   
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}





module.exports = {
    create_cart,
    update_cart,
    delete_cart,
    find_user_cart,
    get_all_carts
}