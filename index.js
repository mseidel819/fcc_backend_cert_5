var express = require("express");
var cors = require("cors");
require("dotenv").config({ path: "./.env" });

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  const data = req.file;
  const { originalname, mimetype, size } = req.file;
  console.log(data);
  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
