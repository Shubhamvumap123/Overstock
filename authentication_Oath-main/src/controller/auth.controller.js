
const User = require("../model/user.model")
const jwt = require("jsonwebtoken");
require('dotenv').config()
const generateToken = (user) =>{
//    console.log(process.env.SECRET_KEY)
    // Secure: Only include necessary public fields. Exclude password hash.
    const payload = {
        _id: user._id,
        email: user.email,
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

        // Secure: Whitelist fields to prevent Mass Assignment (e.g. role elevation)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: ["customer"] // Force default role
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
        
        const match =  user.checkPassword(req.body.password);
        if (!match) return res.status(400).send("Wrong email and password please check again");

        const token = generateToken(user)
        return res.status(200).send({user,token});

       
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

module.exports ={register,login,generateToken};