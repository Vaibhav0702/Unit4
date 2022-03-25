const express = require("express");

const Gallery = require("../models/gallary.models");
const upload = require("../middelwares/uploads");

const router = express.Router();


router.get("/", async(req,res)=>{
    try {
        const gallery = await Gallery.find().populate("user_id").lean().exec();
        return res.status(200).send(gallery);
    } catch (err) {
        return res.status(500).send({message:err.message});
    }
})

router.post("/multiple", upload.any("profilePic"), async (req, res) => {
    try {
      const filePaths = req.files.map((file) => {
        return file.path;
      });
  
      const gallery = await Gallery.create({
        userPic: filePaths,
      });
  
      return res.status(200).send(gallery);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  module.exports = router;
  