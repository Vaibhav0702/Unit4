const express = require("express");

const router = express.Router();

const User = require("../models/user.model");


router.get("", async(req,res) => {

    try{
    const product = await User.find().lean().exec();
    return res.status(200).send(product);
    }
    catch(err)
    {
         res.status(500).send({err:err.message});
    }
    
});


module.exports = router;


