const express = require("express");
const Submission = require("../models/submission.models");

const app = express();

app.get("/", async (req, res) => {
  try {
    const user = await Submission.find().lean().exec();
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

app.post("/", async (req, res) => {
  try {
    const user = await Submission.create(req.body);
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const user = await Submission.findByIdAndUpdate(req.params.id).lean().exec;
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const user = await Submission.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

app.get("/:id/evaluation", async (req, res) => {
  try {
    const user = await Submission.find({ evaluation_id: req.params.id })
      .lean()
      .exec();
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

app.get("/:id/marks", async (req, res) => {
  try {
    const user = await Submission.find({ evaluation_id: req.params.id })
      .populate({ path: "student_id", populate: { path: "userId" } })
      .sort({ marks: -1 })
      .limit(1)
      .lean()
      .exec();

    return res.send(user);
  } catch (err) {
    return res.status(500).send({ msg : err.message});
  }
});

module.exports = app;
