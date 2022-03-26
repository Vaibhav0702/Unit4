const books = require("./books.json");

const express = require("express");

const app = express();

// app.use(allBooks);


app.get("/books", allBooks, (req, res) => {
    return res.send(books);
});

app.get("/book/:name", singleBook, (req, res) => {
    return res.send({"bookName": req.name});
});

function allBooks(res, req, next) {
    console.log("Fetching all books");
    next();
}

function singleBook(res, req, next) {
    req.name=req.params.name
    if( req.name=="GameOfThrones" || req.name=="HarryPotter"){
        next()
    }else{
        return res.send("not matching")
    }
}


app.listen(5000, () => {
    console.log("listening on port 5000");
});