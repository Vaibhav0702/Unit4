const  express = require ('express');

const app = express();

const books = require("./books.json")

app.listen(4600, () =>{
    console.log('hello')
});
console.log(app)


app.get ('/users', function (req, res){

    res.send("hello");
})

app.get ('/books', function (req, res){

    res.send({books});
})



