// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


mongoose.Promise = Promise;

var Address = require("./models/address");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

mongoose.connect("mongodb://localhost/reactbutts");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/:count?", function(req, res) {

  var count = parseInt(req.params.count);

  if (count) {
    Address.find({}).limit(count).exec(function(err, doc) {

      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    });
  } else {

    Address.find({}).exec(function(err, doc) {

      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    });
  }
});

app.post("/api", function(req, res) {

  var query = req.body.query;
  var address = req.body.address;

  Address.findOneAndUpdate({
    query: query
  }, {
    $set: {
      address: address
    }
  }, { upsert: true }).exec(function(err) {

    if (err) {
      console.log(err);
    } else {
      res.send("Updated Query Address and date!!");
    }
  });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
