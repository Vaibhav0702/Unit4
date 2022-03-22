const express = require("express");


const router = express.Router();

const Product = require("../models/product.model");

const authenticate = require("../middleware/authenticate")



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


// ---------------


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

// ------------------------

router.delete("/id", authenticate ,async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send(product);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


//   --------------------------


  router.patch("/id", authenticate ,async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(200).send(product);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


module.exports = router;