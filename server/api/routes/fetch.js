const cron = require("node-cron"),
  path = require("path");

module.exports = (app, cors) => {
  const fs = require("fs");
  app.get("/api/fetchAll", cors(), (req, res) => {
    fs.readdir("images", function(err, files) {
      if (err) {
        res.status(500).send({ data: err });
      }
      const data = { images: [] };
      files.forEach(function(file) {
        data.images.push({
          filename: file,
          imageUrl: `storage/pictures/${file}`
        });
      });
      res.status(200).send(data);
    });
  });

  cron.schedule("0 0 0 * * *", () => {
    fs.readdir("images", function(err, files) {
      files.forEach(function(file) {
        console.log(path.join("images", file));
        fs.unlink(path.join("images", file), err => {
          if (err) throw err;
        });
      });
    });
  });
};
