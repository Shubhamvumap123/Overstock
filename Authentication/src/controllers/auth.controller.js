
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

// SENTINEL FIX: Helper to validate password strength
const validatePassword = (password) => {
    if (!password) return "Password is required";
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[\W_]/.test(password);

    if (password.length < minLength) return "Password must be at least 8 characters long";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecial) return "Password must contain at least one special character";

    return null;
}

const register = async (req, res) => {
    try{
        // SENTINEL FIX: Validate password strength
        const passwordError = validatePassword(req.body.password);
        if (passwordError) {
            return res.status(400).send({ message: passwordError });
        }

        let user = await User.findOne({email : req.body.email})
        //checking email
        if(user){
            return res.status(400).send({message : "Email already exists" })
        }
        // if new user, create it or allow to register;

        // SENTINEL FIX: Prevent Mass Assignment by explicitly selecting fields
        user = await User.create({
            email: req.body.email,
            password: req.body.password
        });

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

