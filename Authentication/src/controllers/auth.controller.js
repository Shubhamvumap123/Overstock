
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

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

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
        // Security: Input validation
        if (!validateEmail(req.body.email)) {
            return res.status(400).send({ message: "Invalid email format" });
        }

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
