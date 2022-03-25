const path = require("path");

const multer = require("multer");

// ------------------copy paste from documentation ----------------

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, callback) {
    const uniquePreffix = Date.now();
    callback(null, uniquePreffix + "-" + file.originalname);
  },
});

// ------

const fileFilter = (req, file, callback) => {
  // The function should call `callback` with a boolean
  // to indicate if the file should be accepted

  console.log(file);

  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // To accept the file pass `true`, like so:
    callback(null, true);
  } else{
      // To reject this file pass `false`, like so:
    callback(null, false);
  }
 
};



// -------------------------------------------------------

const options = {
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
};

const uploads = multer(options);

module.exports = uploads;

// 1kb = 1024 bytes
// 1mb = 1024 kb
