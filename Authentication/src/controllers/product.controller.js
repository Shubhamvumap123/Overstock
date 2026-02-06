
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
        // ⚡ Bolt Optimization: Use .lean() to return plain JS objects instead of Mongoose docs
        // This improves performance for read-only operations.
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
// Export controller functions for testing
router.createProduct = createProduct;
router.getProducts = getProducts;
