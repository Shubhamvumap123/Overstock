
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
        // Security: Explicitly select fields to prevent Mass Assignment
        user = await User.create({
            email: req.body.email,
            password: req.body.password
        });
        const token = generateToken(user)
        // Security: Return only safe fields, excluding password
        const safeUser = { _id: user._id, email: user.email };
        return res.status(200).send({user: safeUser, token});
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
            // Security: Use generic error message to prevent User Enumeration
            return res.status(400).send({message: "Invalid email or password"})
        }
        //if email exists, check password;
        const match = await user.checkPassword(req.body.password)
        // if it doesn't match
        if(!match){
            // Security: Use generic error message to prevent User Enumeration
            return res.status(400).send({message : "Invalid email or password"})
        }
        // if it matches
        const token = generateToken(user)
        // Security: Return only safe fields, excluding password
        const safeUser = { _id: user._id, email: user.email };
        return res.status(200).send({user: safeUser, token});
    }
    catch(err){
        res.status(400).send({message : err.message})
    }
}

module.exports = {register,login}

