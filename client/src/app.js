var ChosenCountry = require('./models/chosenCountry');

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var makePostRequest = function(country, callback){
  var url = `https://restcountries.eu/rest/v2/name/${country.name}`;
  console.log(url);

  makeRequest(url, countryRequestComplete);

  // var formData = new FormData();
  // formData.append('name', country.name);
  // formData.append('username', 'Chris');
  // console.log(formData);

  // var thing = country.name;
  // console.log(thing);

  var newUrl = "/bucket_list";
  console.log("newUrl");
  var request = new XMLHttpRequest();
  request.open("POST", newUrl);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.addEventListener('load', callback);
  request.send();
};

var postRequestComplete = function(){
  if (this.status !== 200){ return console.log("Post request failed"); }
  // display bucket list countries
  console.log("Request successful");
};

var countryRequestComplete = function(){
  if (this.status !== 200){ return console.log("Country request failed"); }
  // display bucket list countries
  console.log("Request successful");
};

var requestComplete = function() {
  if (this.status !== 200) return;
  var bucketListString = this.responseText;
  var countries = JSON.parse(bucketListString);
  // var UI = new ChosenCountryView(bucketList);
  populateList(countries);
};

var app = function(){
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
};

var populateList = function(countries){
  var button = document.getElementById('add-country-button');
  var select = document.getElementById('countries-list');
  countries.forEach(function(country, index){
    var option = document.createElement('option');
    option.classList.add("country");
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });
  var countriesSelect = document.querySelector("select");
  button.addEventListener('click', function(){
    var country = countries[countriesSelect.selectedIndex];
    handleSelection(country);
  });
  // select.addEventListener("change", function(){
  // });
};

var handleSelection = function(country) {
  makePostRequest(country, postRequestComplete);
};

window.addEventListener("load", app);
