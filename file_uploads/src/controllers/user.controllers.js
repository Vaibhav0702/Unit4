const express = require("express");

const User = require("../models/user.models");

const upload = require("../middelwares/uploads");


const router = express.Router();

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

// ------for single file-----
router.post("", upload.single("profilePic"), async (req, res) => {
  try {
   
    const users = await User.create({

      firstName: req.body.firstName,
      profilePic: req.file.path,

    });
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

// --------for multiple-------

router.post("/multiple", upload.any("profilePic"), async (req, res) => {
  try {
    const filePath = req.files.map((file) => {
      console.log({file})
      return file.path;
    });

   const user = await User.create({
     firstName : req.body.firstName,
     profilePic : filePath,
   })

    
    return res.status(200).send({ user:user });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
