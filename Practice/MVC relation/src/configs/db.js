const mongoose = require('mongoose');


// -----------------------------------------------------------------------------------

const connect = () => {
    return mongoose.connect("mongodb+srv://Vaibhav_0702:Vaibhav_0702@cluster0.lzfpk.mongodb.net/db01?retryWrites=true&w=majority");
}


module.exports = connect;