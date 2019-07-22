const express = require("express"),
  bodyParser = require("body-parser"),
  helmet = require("helmet"),
  https = require("https"),
  cors = require("cors"),
  app = express(),
  port = process.env.PORT || 3002;

app.use("/storage/pictures", express.static("images"));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});


require("dotenv").config();
require("./api/routes/upload")(app);
require("./api/routes/fetch")(app, cors);

if (process.env.DEBUG) {
  const http = require("http");
  http.createServer(app).listen(port, () => {
    console.log(`Server listening on ${process.env.PORT || port}`);
  });
} else {
  const path = process.env.HTTPS;
  https
    .createServer(
      {
        key: fs.readFileSync(path + "privkey.pem"),
        cert: fs.readFileSync(path + "cert.pem"),
        ca: fs.readFileSync(path + "chain.pem")
      },
      app
    )
    .listen(port);
}
