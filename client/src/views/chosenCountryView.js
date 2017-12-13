var ChosenCountryView = function(chosenCountries){
	this.render(chosenCountries);
}

ChosenCountryView.prototype = {
	render: function(chosenCountries){

		console.log(chosenCountries);
		chosenCountries.forEach(function(chosenCountry){
			var li = document.createElement('li');
			var text = document.createElement('p');
			var ul = document.getElementById('chosenCountries');
			text.innerText = chosenCountry.name;
			li.appendChild(text);
			ul.appendChild(li);
		})
	}
}

module.exports = ChosenCountryView;
