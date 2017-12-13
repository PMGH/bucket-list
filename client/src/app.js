// var ChosenCountryView = require('./views/chosenCountryView');

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var requestComplete = function() {
  if (this.status !== 200) return console.log("request failed");
  var bucketListString = this.responseText;
  var bucketList = JSON.parse(bucketListString);
  // var UI = new ChosenCountryView(bucketList);
  console.log(bucketList);
};

var app = function(){
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
};

window.addEventListener("load", app);
