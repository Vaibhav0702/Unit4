const express =require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json()); //middleware to convert json into express

// -----------------------------------------------------------------------------------

const connect = () => {
    return mongoose.connect("mongodb+srv://Vaibhav_0702:Vaibhav_0702@cluster0.lzfpk.mongodb.net/db01?retryWrites=true&w=majority");
}

// -------------------------user----------------------------------------------------------

//user schema

//step 1 : - creating schema

const userSchema = new mongoose.Schema(

    {
        firstName : {type : String , required : true},
        lastName : {type : String , required : false},
        email : {type : String , required : true , unique : true},
        password :{type : String , required : true}
    },
    {   
        versionKey:false,
        timestamps:true,
    }
);

//step 2 : - creating model
const User = mongoose.model("user",userSchema); 

// ----------------post ---------------

//post schema
//step 1 : - creating schema

const postSchema = new mongoose.Schema(
 
    {
        title : {type : String , required : true},
        body : {type : String , required : true},
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true 
        }
    },
    { 
       versionKey:false,
       timestamps : true
    }

);

//step 2 : - creating model

const Post = mongoose.model("post",postSchema);

// ---------------------------comment -------------------------
//comment schema                                                       

//step 1 : - creating schema

const commentSchema = new mongoose.Schema(
    {
        body : {type : String , required : true},
        postId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "post",
            required : true 
        },
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true,
        }

    },
    {   
        versionKey:false,
        timestamps : true
    }
);

//step 2 : - creating model

const Comment = mongoose.model("comment",commentSchema);

// --------------------------User CRUD-------------------------------------------------------------

// CRUD oprations 
// get 
// post
// put/patch
//delete

//users CRUD
app.get("/users", async(req,res) => {
 
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

app.post("/users",async (req,res) => {
  
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

app.get("/users/:id",async(req,res) => {

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

app.patch("/users/:id",async(req,res) => {

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

app.delete("/users/:id",async(req,res) => {

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




// ---------------------------post CRUD--------------------------------------------------------------------

//post CRUD
app.get("/posts", async(req,res) => {
 
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
  app.post("/posts", async(req,res) => {
 
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

app.get("/posts/:id",async(req,res)=>{

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

app.patch("/posts/:id",async(req,res)=>{

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

app.delete("/posts/:id",async(req,res)=>{

    try{
        const posts = await Post.findByIdAndDelete(req.params.id);
        return res.status(201).send({posts:posts});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});


// --------------------------comments CRUD----------------------------------------------


app.get("/comments",async (req,res)=>{

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

app.post("/comments",async (req,res)=>{

    try{
        const comments = await Comment.create(req.body);
        return res.status(201).send({comments:comments});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});


app.get("/comments/:id",async(req,res)=>{

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

app.patch("/comments/:id",async(req,res)=>{

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


app.delete("/comments/:id",async(req,res)=>{

    try{
        const comments = await Comment.findByIdAndDelete(req.params.id);
        return res.status(201).send({comments:comments});
    }
    catch(err)
    {
        return res.status(500).send({ msg : err.message});
    }

});



// -----------------------------






app.listen( 5000 , async () => {

    try{
        await connect();
       
    }
    catch(err)
    {
        console.log(err);
    }
    console.log("listening on port 5000");
});