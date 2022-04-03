const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");
const cors = require('cors');
const {register,login} = require("./controllers/auth.controller");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userController);

app.post("/register", register);

app.post("/login", login);

app.use("/products", productController)
const port = process.env.PORT ||5000
app.listen(port, async () => {
    try{
        await connect();
    }
    catch(err){
        console.log(err.message);
    }
    console.log("listening on port 5000")
});