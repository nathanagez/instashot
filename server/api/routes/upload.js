module.exports = app => {
  const multer = require("multer"),
    storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "images");
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    }),
    upload = multer({ storage: storage });

  app.post("/api/upload", upload.single("image"), (req, res) => {    
    if (req.file) {
      res.status(200).send({ data: "Success" });
    } else {
      res.status(500).send({ data: "Errror" });
    }
  });
};
