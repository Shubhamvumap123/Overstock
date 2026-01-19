
const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (user) => {
    // Only include necessary public fields in the token payload
    // Exclude sensitive data like password hash
    const payload = {
        _id: user._id,
        email: user.email,
    };
    return jwt.sign({ user: payload }, process.env.SECRET_KEY);
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
        const match = await user.checkPassword(req.body.password)
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

