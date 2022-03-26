const express = require("express");
const User = require("../models/user.models");

const app = express();

app.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.send({User:user});
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

app.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id).lean().exec;
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

module.exports = app;
