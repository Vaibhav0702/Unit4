

//  permittedRoles = ["seller","admin"]


const authorise = (permittedRoles) => {

   return (req,res,next) => {
    
     // getting the user;
     const user = req.user;
     let isPermitted = false;


     // checking if he has permitted role
    permittedRoles.map(role =>{
        
        if(user.role.includes(role)){
            isPermitted = true;
        }
    });
 
    // if permitted go ahead 
    if(isPermitted)
    {
        return next();
    }
    // else throw error
    else
    {
        return res.status(401).send({message:"You are not authorised for that"})
    }
   }
};

module.exports  = authorise;