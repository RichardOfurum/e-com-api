// const Joi = require('@hapi/joi');
const Joi = require('joi');

//Register validation
const registerSchemaValidation = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref('password')
});

const loginSchemaValidation = Joi.object({
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6).required()
});


const updatePasswordSchemaValidation = Joi.object({
    password: Joi.string().min(6).required()
});

const createProductSchemaValidation = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    desc: Joi.string().min(6).required(),
    categories: Joi.array().items(),
    img: Joi.string().required(),
    size: Joi.string(),
    color: Joi.string(),
    price: Joi.number().required(),
   
});

const updateProductSchemaValidation = Joi.object({
    title: Joi.string().min(3).max(200),
    desc: Joi.string().min(6),
    categories: Joi.array().items(),
    img: Joi.string(),
    size: Joi.string(),
    color: Joi.string(),
    price: Joi.number(),
   
});

const createCartSchemaValidation = Joi.object({
    userId: Joi.string().required(),
    // products: Joi.array().items({}),   
    products: Joi.array().items(Joi.object().keys({
        productId: Joi.string(),
        quantity: Joi.number()
    })),   
});

const updateCartSchemaValidation = Joi.object({
    userId: Joi.string(),
    products: Joi.array().items(Joi.object().keys({
        productId: Joi.string(),
        quantity: Joi.number()
    })), 
   
});


const createOrderSchemaValidation = Joi.object({
    userId: Joi.string().required(),  
    products: Joi.array().items(Joi.object().keys({
        productId: Joi.string(),
        quantity: Joi.number()
    })).required(),
    amount: Joi.number().required(),
    address: Joi.object().required(),
    status: Joi.string() 
});

const updateOrderSchemaValidation = Joi.object({
    userId: Joi.string(),
    products: Joi.array().items(Joi.object().keys({
        productId: Joi.string(),
        quantity: Joi.number()
    })),
    amount: Joi.number().required(),
    address: Joi.object().required(),
    status: Joi.string()   
   
});


module.exports = {
    registerSchemaValidation,
    loginSchemaValidation,
    updatePasswordSchemaValidation,
    createProductSchemaValidation,
    updateProductSchemaValidation,
    createCartSchemaValidation,
    updateCartSchemaValidation,
    createOrderSchemaValidation,
    updateOrderSchemaValidation
}