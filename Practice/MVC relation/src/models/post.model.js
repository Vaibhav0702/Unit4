const mongoose = require('mongoose');


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


module.exports = Post ;