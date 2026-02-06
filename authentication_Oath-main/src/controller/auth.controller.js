
const User = require("../model/user.model")
const jwt = require("jsonwebtoken");
require('dotenv').config()

const generateToken = (user) =>{
    // SENTINEL FIX: Only include necessary public fields in the token payload
    // Exclude sensitive data like password hash
    const payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    };
    return jwt.sign({ user: payload }, process.env.SECRET_KEY)
}

// SENTINEL FIX: Helper to sanitize user object
const sanitizeUser = (user) => {
    return {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

const register = async (req,res) =>{

    try{

        let  user = await User.findOne({email:req.body.email})

        if (user){
            // SENTINEL FIX: Improved error message (though enumeration is still possible, fixed typo)
            return res.status(400).send({ message: "User already exists please choose different id" });
        }
        // SENTINEL FIX: Prevent Mass Assignment by explicitly selecting fields
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: ["customer"] // Enforce default role
        })

        const token = generateToken(user)
        // SENTINEL FIX: Return sanitized user object
        return res.status(200).send({user: sanitizeUser(user), token});
    }catch(err){
        // SENTINEL FIX: Log error server-side and return generic message to client
        console.error("Registration error:", err);
        res.status(500).send({message: "Registration failed"});
    }
}


const login = async (req,res) =>{

    try{
        let user = await User.findOne({email:req.body.email});

        // SENTINEL FIX: Generic error message to prevent User Enumeration
        const invalidCredsMsg = "Wrong email or password please check again";

        if (!user) return res.status(400).send({ message: invalidCredsMsg });
        
        const match = await user.checkPassword(req.body.password);
        if (!match) return res.status(400).send({ message: invalidCredsMsg });

        const token = generateToken(user)
        // SENTINEL FIX: Return sanitized user object
        return res.status(200).send({user: sanitizeUser(user), token});

       
    }catch(err){
        // SENTINEL FIX: Log error server-side and return generic message to client
        console.error("Login error:", err);
        res.status(500).send({message: "Login failed"});
    }
}

module.exports ={register,login,generateToken};
