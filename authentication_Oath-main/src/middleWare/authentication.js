require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken =(token)=>{
    return new Promise ((resolve, reject)=>{
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            
           if (err) return reject(err);
            
           return resolve(decoded);
        });
    })
};

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({message:"authorization is not found please check again"});

    if (!req.headers.authorization.startsWith("Bearer ")) return res.status(401).send({message:"authorization is not found please check again"});

    const token = req.headers.authorization.trim().split(" ")[1];

    let decoded;

    try{

        decoded = await verifyToken(token);

    }
    catch(err){
        return res.status(403).send({message:"authorization is not found please check again"});
    }

    req.user =decoded.user;
    next();
}

module.exports = authenticate;

