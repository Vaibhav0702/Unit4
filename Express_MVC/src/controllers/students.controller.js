const express = require("express");
const Student = require("../models/students.models");

const app = express();

app.get("/", async (req, res) => {
  try {
    const user = await Student.find().lean().exec();
    return res.send(user);
  } catch (err) {
     return res.status(500).send({ msg : err.message});
  }
});

app.post("/", async (req, res) => {
  try {
    const user = await Student.create(req.body);
    return res.send(user);
  } catch (err) {
     return res.status(500).send({ msg : err.message});
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const user = await Student.findByIdAndUpdate(req.params.id).lean().exec;
    return res.send(user);
  } catch (err) {
     return res.status(500).send({ msg : err.message});
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const user = await Student.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(user);
  } catch (err) {
     return res.status(500).send({ msg : err.message});
  }
});

module.exports = app;
