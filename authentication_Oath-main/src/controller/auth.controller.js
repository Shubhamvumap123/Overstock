
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
        user = await User.create(req.body)

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
        
        const match =  user.checkPassword(req.body.password);
        if (!match) return res.status(400).send("Wrong email and password please check again");

        const token = generateToken(user)
        return res.status(200).send({user,token});

       
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

module.exports ={register,login,generateToken};