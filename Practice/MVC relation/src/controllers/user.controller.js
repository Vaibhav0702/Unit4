const express =require('express');
const User = require("../models/user.model");
const app = express();

// --------------------------User CRUD-------------------------------------------------------------

// CRUD oprations 
// get 
// post
// put/patch
//delete

//users CRUD
app.get("", async(req,res) => {
 
    try{
      const users = await User.find().lean().exec();
      return res.status(200).send({users:users});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }
  
  });
  
  
  // -----------------Post---------------------
  
  app.post("",async (req,res) => {
    
  try{
      const users = await User.create(req.body);
      return res.status(201).send({users:users});
  }
  catch(err)
  {
      return res.status(500).send({ msg : err.message});
  }
  
  });
  
  // ---------------------for gating single item -----------------
  
  //body => req.body
  //url => req.params
  //query =>req.query
  
  app.get("/:id",async(req,res) => {
  
      try{
          const users = await User.findById(req.params.id).lean().exec();
          //db.users.findOne({_id:622dc89391297b99b04f7eee})
  
          return res.status(201).send({users:users});
      }
      catch(err)
      {
          return res.status(500).send({ msg : err.message});
      }
  
  });
  
  // --------------------------Update--------------------------------------
  
  app.patch("/:id",async(req,res) => {
  
      try{
          const users = await User.findByIdAndUpdate(req.params.id , req.body , {new:true});
          //db.users.findOne({_id:622dc89391297b99b04f7eee},{$set:{req.body}})
  
          return res.status(201).send({users:users});
      }
      catch(err)
      {
          return res.status(500).send({ msg : err.message});
      }
  
  });
  
  // ---------------------------Delete----------------------------------------------
  
  app.delete("/:id",async(req,res) => {
  
      try{
          const users = await User.findByIdAndDelete(req.params.id).lean().exec();
          //db.users.deleteOne({_id:622dc89391297b99b04f7eee})
  
          return res.status(201).send({users:users});
      }
      catch(err)
      {
          return res.status(500).send({ msg : err.message});
      }
  
  });
  
  module.exports = app ;