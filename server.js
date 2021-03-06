var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(require("./controllers"));

app.use(express.static("client/build"));

var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/bucket_list", function(err, client){
  if(err){
    return console.log(err);
  }
  db = client.db("bucket_list");
  console.log("Connected to DB");

  app.listen(3000, function () {
    console.log("App running on port " + this.address().port);
  });
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/client/build/index.html");
});

app.get("/bucket_list", function(req, res) {
	db.collection("bucket_list").find().toArray(function(err, results){
	  if(err){
		return console.log(err);
	  }
	  res.json(results);
	});
});

app.post("/add_country", function(req, res) {
  var chosenCountry = new Country(req.body);
  db.collection("bucket_list").save(chosenCountry, function(err, result) {
    if(err){
      return console.log(err);
    }

    console.log("Saved to database");
    res.redirect("/");
  });
});
