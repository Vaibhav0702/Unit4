
const express =require('express');
const Comment = require("../models/comment.model");


const app = express();



// --------------------------comments CRUD----------------------------------------------


app.get("",async (req,res)=>{

    try{
        const comments = await Comment.find().populate({path : "postId",select:["title"] , populate:{path:"userId",select:["firstName"]}}).populate({path : "userId",select:["firstName"]}).lean().exec();
        return res.status(201).send({comments:comments});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});

// ----------------

app.post("",async (req,res)=>{

    try{
        const comments = await Comment.create(req.body);
        return res.status(201).send({comments:comments});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});


app.get("/:id",async(req,res)=>{

    try{
        const comments = await Comment.findById(req.params.id).populate({path:"postId",select:["title","body"],populate:{path:"userId",select:["password"]}}).populate({path : "userId",select:["firstName"]}).lean().exec();
        return res.status(201).send({comments:comments});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});

// ----------------------------

app.patch("/:id",async(req,res)=>{

    try{
        const comments = await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate({path : "postId",select : ["title"]}).populate({path : "userId",select:["firstName"]}).lean().exec();
        return res.status(201).send({comments:comments});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});

// --------------------------


app.delete("/:id",async(req,res)=>{

    try{
        const comments = await Comment.findByIdAndDelete(req.params.id);
        return res.status(201).send({comments:comments});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});


module.exports = app ;