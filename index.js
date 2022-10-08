const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const cookieParser = require('cookie-parser');
const cors = require('cors');


dotenv.config();


const app = express();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("server in running");
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin:true}));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);