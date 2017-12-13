// var PlayerView = require('./views/bucketListView');

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var requestComplete = function() {
  if (this.status !== 200) return;
  var bucketListString = this.responseText;
  var bucketList = JSON.parse(bucketListString);
  // var UI = new BucketListView(bucketList);
};

var app = function(){
  console.log("Running app.js");
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
};

window.addEventListener("load", app);
