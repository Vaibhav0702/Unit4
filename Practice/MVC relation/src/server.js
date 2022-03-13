
const connect = require("./configs/db.js");

const app = require("./index.js");


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