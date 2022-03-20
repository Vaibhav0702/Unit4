
const User = require("../models/user.model");


const jwt = require('jsonwebtoken'); // npm json web token laibrary


require('dotenv').config() // dot env laibrary


//-----------------generet token
const generateToken = (user) => {
    // console.log( process.env.tokenSecretKey);
    return jwt.sign({ user }, process.env.tokenSecretKey); // copy paste from npm json web token laibrary
}

// ---------------------
const register = async (req, res) => {
  try {

    let user = await User.findOne({email:req.body.email});
   //checking email 
    if(user)
    {
        return res.status(400).send({message:"Already Registerd"});  
    }
    // if user is new allow it or allow to register
    user = await User.create(req.body);
// -----------
    const token = generateToken(user);

    return res.status(200).send({user,token});

  } catch (err) {

    res.status(400).send({ err: err.message });

  }
};




// ---------------------login--------------------------------------------------------------------------------------------


const login = async (req, res) => {
  try {
    const user = await User.findOne({ email : req.body.email});
   // check email is exsist??
    if(!user)
    {
      return res.status(400).send("Wrong Email");
    }
    // if email exsist , check password
    const match = user.checkPassword(req.body.password);
    //if password not match
    if(!match)
    {
        res.status(400).send("Wrong  Password")  
    }
    const token = generateToken(user);

    return res.status(200).send({user,token});
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

module.exports = { register, login };
