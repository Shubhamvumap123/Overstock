
const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const Product = require("../models/product.model")

const createProduct = async (req, res) => {
    req.body.user_id = req.userID;
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
}

const getProducts = async (req, res) => {
    try{
        // ⚡ Bolt Optimization: Added .lean() to return POJOs instead of Mongoose Documents.
        // This avoids the overhead of hydrating full Mongoose instances for read-only data.
        const product = await Product.find().lean()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
}

router.post("", authenticate, createProduct)

router.get("", getProducts)

module.exports = router;
module.exports.createProduct = createProduct;
module.exports.getProducts = getProducts;
