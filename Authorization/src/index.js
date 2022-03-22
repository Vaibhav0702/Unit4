const express = require("express");

const connect = require("./configs/db");


const userController = require("./controller/user.controller")
const productController = require("./controller/product.controller");

const { register , login } = require("./controller/auth.controller")





const app = express();

app.use(express.json());


app.use("/users",userController);
app.post("/register",register);
app.post("/login",login);


app.use("/product",productController);





app.listen( 4000 , async () => {

    try{
        await connect();
        console.log("listening on 4000");
    }
    catch(err)
    {
        console.log(err.message);
    }
})