const express = require("express");
const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");
let app = express();
let router = express.Router();
let data = path.join(__dirname, "./formsubmissions.json");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static(path.join(__dirname, "../public")));

// app.get('/', (req, res, next) => {
//     res.send("Hello from the web server side...");
// });
// router.get("/contact-form", (req, res) => {
//   res.send("info sent");
// });

app.post("/contact-form", (req, res) => {
  let writeObj = {
    name: req.body.name,
    email: req.body.email,
  };
  fs.writeFile(data, JSON.stringify(writeObj), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.sendStatus(200);
});

app.get("/contact-form", (req, res) => {
  fs.readFile(data, (err, data) => {
    data = JSON.parse(data);
    res.send(
      `Your name is ${data.name} and your email address is ${data.email}`
    );
  });
});

app.listen(3000);
