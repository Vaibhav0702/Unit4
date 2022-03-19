const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Vaibhav_0702:Vaibhav_0702@cluster0.lzfpk.mongodb.net/Validators?retryWrites=true&w=majority"
  );
};

//Schemas

// ---------UserSchema---------

const userSchama = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    pincode: { type: String, required: true },
    age: { type: Number, required: false },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      default: "Male",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchama);

// --------------------User CRUD------------

//users CRUD
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send({ users: users });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

// -----------------Post---------------------

app.post(
  "/users",
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name cannot be empty"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 120")
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
    body("pincode").isLength({min:6,max:6}).withMessage("pincode should be required exact 6 character"),
  async (req, res) => {
    try {
      // --------------copy paste from documentation -------
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // ------------------

      const users = await User.create(req.body);
      return res.status(201).send({ users: users });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }
);

// ---------------------for gating single item -----------------

//body => req.body
//url => req.params
//query =>req.query

app.get("/users/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id).lean().exec();
    //db.users.findOne({_id:622dc89391297b99b04f7eee})

    return res.status(201).send({ users: users });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

// --------------------------Update--------------------------------------

app.patch("/users/:id", async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    //db.users.findOne({_id:622dc89391297b99b04f7eee},{$set:{req.body}})

    return res.status(201).send({ users: users });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

// ---------------------------Delete----------------------------------------------

app.delete("/users/:id", async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id).lean().exec();
    //db.users.deleteOne({_id:622dc89391297b99b04f7eee})

    return res.status(201).send({ users: users });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

// ----------------------------------------------------

app.listen(5000, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }
  console.log("listening on port 5000");
});
