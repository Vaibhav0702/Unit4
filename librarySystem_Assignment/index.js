const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/librarySystem2");
};

//------------------------------------------------------------------- Schemas

// ------------sectionSchema-----

const sectionSchema = new mongoose.Schema(
  {
    section_name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Section = mongoose.model("section", sectionSchema);

// --------------bookSchema------------

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    body: { type: String, required: true },
    section_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Book = mongoose.model("book", bookSchema);

// --------------authorSchema-----------

const authorSchema = new mongoose.Schema(
  {
    author_name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Author = mongoose.model("author", authorSchema);

// ----------bookAuthorSchema-------------

const bookAuthorSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    author_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "author", required: true },
    ],
  },
  {
    versionKey: false,
  }
);

const BookAuthor = mongoose.model("bookAuthor", bookAuthorSchema);

//-----------------------checkOutSchema

const checkoutSchema = new mongoose.Schema(
  {
    checkedOutTime: { type: Date, default: "null", required: true },
    checkedInTime: { type: Date, default: "null", required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Checkout = mongoose.model("checkout", checkoutSchema);

// -----------------------------UserSchema

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

// -----------------------------------------------------------CRUD

// -------------------user CRUD

app.get("/users", async (req, res) => {
  const user = await User.find().lean().exec();
  res.status(200).send({ user });
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);

  return res.status(201).send({ user });
});

// --------------section CRUD-------------

app.get("/section", async (req, res) => {
  const section = await Section.find().lean().exec();
  res.status(200).send({ section });
});

app.post("/section", async (req, res) => {
  const section = await Section.create(req.body);

  return res.status(201).send({ section });
});

//----------------book CRUD-----------------------

app.get("/book", async (req, res) => {
  const book = await Book.find().populate("section_name").lean().exec();
  res.status(200).send({ book });
});

app.get("/book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id).lean().exec();
  res.status(200).send({ book });
});

app.post("/book", async (req, res) => {
  const book = await Book.create(req.body);

  return res.status(201).send({ book });
});

//----------------Authors CRUD -----------------------

app.get("/author", async (req, res) => {
  const author = await Author.find().lean().exec();
  res.status(200).send({ author });
});

app.post("/author", async (req, res) => {
  const author = await Author.create(req.body);

  return res.status(201).send({ author });
});

//----------------bookAuthor CRUD -----------------------

app.get("/bookauthor", async (req, res) => {
  const bookauthor = await BookAuthor.find()
    .populate("author_id")
    .populate("book_id")
    .lean()
    .exec();
  res.status(200).send({ bookauthor });
});

// All books written by an Author

app.get("/booksbyauthor/:id", async (req, res) => {
  const match = await BookAuthor.find({ author_id: req.params.id })
    .lean()
    .populate("book_id")
    .exec();
  res.send(match);
});

app.post("/bookauthor", async (req, res) => {
  const bookauthor = await BookAuthor.create(req.body);
  return res.status(201).send({ bookauthor });
});

// ---------------------------CheckOut CRUD---------------------------------------

app.get("/checkout", async (req, res) => {
  try {
    const checkout = await Checkout.find().lean().exec();
    return res.status(200).send(checkout);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/checkout", async (req, res) => {
  try {
    const checkout = await Checkout.create(req.body);

    return res.status(201).send(checkout);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.patch("/checkout/:id/checkout", async (req, res) => {
  try {
    const checkout = await Checkout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(checkout);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// ----------------------------------
app.listen(5000, async (req, res) => {
  await connect();
  console.log("Listening to port 5000");
});
