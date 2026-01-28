
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
        // FIX: Prevent Mass Assignment by explicitly selecting fields
        user = await User.create({
            email: req.body.email,
            password: req.body.password
        });
        const token = generateToken(user)

        // Return a safe user object without password hash
        const safeUser = {
            _id: user._id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(200).send({user: safeUser, token});
    }
    catch(err){
        // FIX: Don't leak error details
        console.error("Registration error:", err);
        res.status(500).send({message : "Registration failed"})
    }
}

const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})

        // FIX: Generic error message to prevent User Enumeration
        const invalidCredentialsMsg = "Invalid email or password";

        //checked if mail exists
        if(!user){
            return res.status(400).send({message: invalidCredentialsMsg})
        }
        //if email exists, check password;
        const match = await user.checkPassword(req.body.password)
        // if it doesn't match
        if(!match){
            return res.status(400).send({message : invalidCredentialsMsg})
        }
        // if it matches
        const token = generateToken(user)

        // Return a safe user object without password hash
        const safeUser = {
            _id: user._id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(200).send({user: safeUser, token});
    }
    catch(err){
         // FIX: Don't leak error details
        console.error("Login error:", err);
        res.status(500).send({message : "Login failed"})
    }
}

module.exports = {register,login}
