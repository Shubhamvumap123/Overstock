
const authorise = (permittedRoles) =>{

    return (req,res,next) =>{
        console.log(req)
         
        const user = req.user
        let isPermitted = false;

        permittedRoles.map((role)=>{
            if (user.role.includes(role)) isPermitted = true;
        });


    //    checking for premitted and go ahead other wise throw error
        if (isPermitted){
            return next();
        }
        else {
            return res.status(401).send({message:"you are not authorise person to allow to do this changes"});
        }
    }
}

module.exports =authorise;