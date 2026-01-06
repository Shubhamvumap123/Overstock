
const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (user) => {
    // SECURITY: Only include necessary fields in the token.
    // Excluding the password (even hashed) and other sensitive data.
    const payload = {
        _id: user._id,
        email: user.email,
        // Add other safe fields if necessary, e.g., roles
    };
    return jwt.sign({user: payload}, process.env.SECRET_KEY)
}
const register = async (req, res) => {
    try{
        let user = await User.findOne({email : req.body.email})
        //checking email
        if(user){
            return res.status(400).send({message : "Email already exists" })
        }
        // if new user, create it or allow to register;
        user = await User.create(req.body);
        const token = generateToken(user)
        return res.status(200).send({user, token});
    }
    catch(err){
        res.status(400).send({message : err.message})
    }
}
const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        //checked if mail exists
        if(!user){
            return res.status(400).send("Wrong Email or Password111")
        }
        //if email exists, check password;
        const match = user.checkPassword(req.body.password)
        // if it doesn't match
        if(!match){
            return res.status(400).send({message : "Wrong Email or Password222"})
        }
        // if it matches
        const token = generateToken(user)
        return res.status(200).send({user, token});
    }
    catch(err){
        res.status(400).send({message : err.message})
    }
}

module.exports = {register,login}
