
const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const Product = require("../models/product.model")

const createProduct = async (req, res) => {
    // FIX: Prevent Mass Assignment by explicitly selecting fields
    const { title, price } = req.body;

    try{
        const product = await Product.create({
            title,
            price,
            user_id: req.userID
        })
        return res.status(200).send(product)
    }
    catch(err){
        // FIX: Don't leak error details
        console.error("Product creation error:", err);
        return res.status(500).send({message : "Product creation failed"})
    }
}

const getProducts = async (req, res) => {
    try{
        const product = await Product.find()
        return res.status(200).send(product)
    }
    catch(err){
        console.error("Get products error:", err);
        return res.status(500).send({message : "Failed to retrieve products"})
    }
}

router.post("", authenticate, createProduct)

router.get("", getProducts)

module.exports = router;
module.exports.createProduct = createProduct;
module.exports.getProducts = getProducts;
