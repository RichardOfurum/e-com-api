const Product = require('../models/Product');
const {createProductSchemaValidation, updateProductSchemaValidation} = require('../validation/validationSchema');


const create_product = async (req, res) => {
    
    const result = await createProductSchemaValidation.validateAsync(req.body);
    const newProduct = new Product(result)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json({success: true, message: "product saved"});
    } catch (e) {
        res.status(500).json({success: false,  message: e.message})
        console.log(e.message);
    }
    // res.status(200).json("product controller");


}




const update_produtct = async (req, res) => {
    try {
        // res.json(req.cookies.accessToken)
            const result = await updateProductSchemaValidation.validateAsync(req.body);
            
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, 
                {
                    $set: result
                },

                {new: true}
            );
       
            if (updateProduct) {
                res.status(200).send({success: true, message: "Product updated", data: updateProduct})
            }else{
                res.status(401).json({success: false, message: "Product does not exist!"})
                // throw new SyntaxError(`user id does not exist!`);
            }
  
    } catch (e) {
        console.log(e.message);
        res.status(500).json({success:false, message:e.message});
    }
    
}


const delete_product = async(req, res) =>{
    try {
        if(await Product.findByIdAndDelete(req.params.id)){
            res.status(200).json({success: true, message:"product deleted"});
        }else{
            res.status(401).json({success: false, message:"Product not found"});
        }
        
    } catch (e) {
        res.status(500).json(e.message);
    }
}

const find_product = async(req, res) =>{
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({success:true, message:"user found", data: product});
        }else{
            res.status(401).json({success: false, message: 'product not found'});
        }   
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}



const get_all_products = async(req, res) =>{
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }else if (qCategory){
            products = await Product.find({
                categories:{
                    $in: [qCategory]
                },
            })
            // console.log("searching for category");
        }else{
            products = await Product.find();
        }

        if (products) {
            console.log(products)
            
            res.status(200).json({success:true, message:"products found", data: products});
        }else{
            res.status(401).json({success:false, message:"no product found", data: products});
            // throw new Error(`can not find user`);
        }   
       
    } catch (e) {
        res.status(500).json({success:false, message:e.message});
    }
}





module.exports = {
    create_product,
    update_produtct,
    delete_product,
    find_product,
    get_all_products
}