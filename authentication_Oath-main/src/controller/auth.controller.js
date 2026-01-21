
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
        // SENTINEL FIX: Prevent Mass Assignment by explicitly selecting fields
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: ["customer"] // Enforce default role
        })

        const token = generateToken(user)
       return res.status(200).send({user,token});
    }catch(err){
        res.status(500).send({message:err.message});
    }
}


const login = async (req,res) =>{

    try{
        let user = await User.findOne({email:req.body.email});

        if (!user) return res.status(400).send("Wrong email and password please check again");
        
        const match = await user.checkPassword(req.body.password);
        if (!match) return res.status(400).send("Wrong email and password please check again");

        const token = generateToken(user)
        return res.status(200).send({user,token});

       
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

module.exports ={register,login,generateToken};