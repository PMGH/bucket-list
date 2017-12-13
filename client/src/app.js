var ChosenCountry = require('./models/chosenCountry');

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
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
  var select = document.getElementById('countries-list');
  countries.forEach(function(country, index){
    var option = document.createElement('option');
    option.classList.add("country");
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });
  var countriesSelect = document.querySelector("select");
  select.addEventListener("change", function(){
    var country = countries[countriesSelect.selectedIndex];
    handleSelection(country);
  });
};

var handleSelection = function(country) {
  var chosenCountry = new ChosenCountry(country);
  console.log(chosenCountry);
};

window.addEventListener("load", app);
