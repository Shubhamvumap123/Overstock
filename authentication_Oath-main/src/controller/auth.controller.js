
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

const register = async (req,res) =>{

    try{

        let  user = await User.findOne({email:req.body.email})

        if (user){
            
            return res.status(400).send("User already exists plesae choose different id ");
        }

        // SENTINEL: Fix Mass Assignment vulnerability by explicitly selecting fields
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: ["customer"] // Force role to be customer
        });

        const token = generateToken(user)

        // SENTINEL: Fix sensitive data exposure in response (exclude password)
        const userResponse = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

       return res.status(200).send({user: userResponse, token});
    }catch(err){
        res.status(500).send({message:err.message});
    }
}


const login = async (req,res) =>{

    try{
        let user = await User.findOne({email:req.body.email});

        if (!user) return res.status(400).send("Wrong email and password please check again");
        
        const match =  user.checkPassword(req.body.password);
        if (!match) return res.status(400).send("Wrong email and password please check again");

        const token = generateToken(user)

        // SENTINEL: Fix sensitive data exposure in response (exclude password)
        const userResponse = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        return res.status(200).send({user: userResponse, token});

       
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

module.exports ={register,login,generateToken};