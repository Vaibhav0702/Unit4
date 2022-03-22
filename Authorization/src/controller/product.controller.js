const express = require("express");


const router = express.Router();

const Product = require("../models/product.model");

const authenticate = require("../middleware/authenticate") // middelware
const authorise = require("../middleware/authorise") // middleware 

// ----post  with authentication
router.post("", authenticate ,async (req,res)=>{

    console.log(req);
    req.body.user_id = req.user._id; // get user id from token

try{
    const product = await Product.create(req.body);
return res.status(200).send(product);
}
catch(err)
{
     res.status(500).send({err:err.message});
}

}) 
// --------patch with authentication and authorisation



router.patch("/:id",authenticate , authorise(["admin","seller"]) , async(req,res) => {

    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).send(product);
    }
    catch(err)
    {
         res.status(500).send({err:err.message});
    }


});








// ---------get -----

router.get("", async(req,res) => {

    try{
        const product = await Product.find().lean().exec();
    return res.status(200).send(product);
    }
    catch(err)
    {
         res.status(500).send({err:err.message});
    }


});









module.exports = router;