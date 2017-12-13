var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(require("./controllers"));

app.use(express.static("client/build"));

var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/bucket_list", function(err, database){
  if(err){
    return console.log(err);
  }
  db = database;
  console.log("Connected to DB");

  app.listen(3000, function () {
    console.log("App running on port " + this.address().port);
  });
});
