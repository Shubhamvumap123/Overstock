
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title : {type : String, required : true},
    price : {type : Number, required : true},
    user_id : {type : mongoose.Schema.Types.ObjectId, ref:"user", required : true}
},{
    timestamps : true,
    versionKey : false,
})


const Product = mongoose.model("product", productSchema)

module.exports = Product;