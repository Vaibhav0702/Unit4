const express =require('express');
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const app = express();

// ---------------------------post CRUD--------------------------------------------------------------------

//post CRUD
app.get("", async(req,res) => {
 
    try{
      const posts = await Post.find().populate({path : "userId",select:{firstName:1,email:1,_id:0}}).lean().exec();
      
      // .populate({path:"userId",select:{firstName:1,email:1,_id:0}})

      return res.status(200).send({posts:posts});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }
  
  });

// -----
  app.post("", async(req,res) => {
 
    try{
        const posts = await Post.create(req.body);
        return res.status(201).send({posts:posts});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }
  
  });
  
//   -----

app.get("/:id",async(req,res)=>{

    try{
        const posts = await Post.findById(req.params.id).populate({path : "userId",select:{firstName:1,email:1,_id:0}}).lean().exec();
        return res.status(201).send({posts:posts});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});

// ----------

app.patch("/:id",async(req,res)=>{

    try{
        const posts = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate({path : "userId",select:{firstName:1,email:1,_id:0}}).lean().exec();
        return res.status(201).send({posts:posts});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});

// --------

app.delete("/:id",async(req,res)=>{

    try{
        const posts = await Post.findByIdAndDelete(req.params.id);
        return res.status(201).send({posts:posts});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});

  
module.exports = app ;