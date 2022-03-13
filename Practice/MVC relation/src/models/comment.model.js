const mongoose = require('mongoose');

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

module.exports = Comment ;