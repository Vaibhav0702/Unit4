const mongoose = require("mongoose");


//user schema

//step 1 : - creating schema

const userSchema = new mongoose.Schema(
    {
        firstName : {type : String , required : true},
        profilePic:[{ type:String, required:false}]
    },
    {   
        versionKey:false,
        timestamps:true,
    }
);

//step 2 : - creating model
const User = mongoose.model("user",userSchema); 

module.exports = User ;