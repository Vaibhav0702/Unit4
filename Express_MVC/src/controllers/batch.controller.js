const express = require("express");
const Batch = require("../models/Batch.models");

const app = express();

app.get("/", async (req, res) => {
  try {
    const user = await Batch.find().lean().exec();
    return res.send(user);
  } catch (err) {
     return res.status(500).send({ msg : err.message});
  }
});

app.post("/", async (req, res) => {
  try {
    const user = await Batch.create(req.body);
    return res.send(user);
  } catch (err) {
     return res.status(500).send({ msg : err.message});
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const user = await Batch.findByIdAndUpdate(req.params.id).lean().exec;
    return res.send(user);
  } catch (err) {
     return res.status(500).send({ msg : err.message});
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const user = await Batch.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(user);
  } catch (err) {
     return res.status(500).send({ msg : err.message});
  }
});

module.exports = app;
