const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];
var work = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date();
  var date = today.toLocaleDateString("en-US", options);
  res.render("list", { title: date, i: items });
});

app.post("/", (req, res) => {
  var item = req.body.item;
  if (req.body.submit === "Work") {
    work.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { title: "Work", i: work });
});
app.post("/work", (req, res) => {
  var item = req.body.item;
  work.push(item);
  res.redirect("/work");
});

app.get("/About", (req, res) => {
  res.render("About");
});
app.listen(3000, () => {
  console.log("Listening on Port 3000....");
});
