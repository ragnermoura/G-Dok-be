const multer = require("multer");
const path = require("path");

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes('documento')) {
      folder = "documento";
    } else if (req.baseUrl.includes('usuarios')) {
      folder = "avatar";
    }
    cb(null, `public/images/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const Upload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas pdf"));
    }
    cb(undefined, true);
  },
});

module.exports = { Upload };
