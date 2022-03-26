const express =require('express');

// ---
const User = require("./models/user.models");  
const Batch = require("./models/Batch.models");  
const Student = require("./models/students.models");  
const Evaluation = require("./models/evaluation.models"); 
const Submission = require("./models/submission.models"); 

// -----------

const userControllers = require("./controllers/user.controller");
const batchControllers = require("./controllers/batch.controller");
const studentControllers = require("./controllers/students.controller");
const evaluationControllers = require("./controllers/evaluation.controller");
const submissionControllers = require("./controllers/submission.controller");


// --------



const app = express();

app.use(express.json()); //middleware to convert json into express

app.use("/user",userControllers)
app.use("/batch",batchControllers)
app.use("/student",studentControllers)
app.use("/evaluation",evaluationControllers)
app.use("/submission",submissionControllers)


module.exports = app ;