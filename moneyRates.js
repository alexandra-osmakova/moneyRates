var moneyToChange = document.getElementById('moneyToChange');
var moneyChanged = document.getElementById('moneyChanged');
var result = document.getElementById('result');
var input = document.getElementById('input');
var disabledOption = document.getElementById('disabledOption');
var btn = document.getElementById('btn');

var url = 'https://www.cbr-xml-daily.ru/daily_json.js';

fetch(url)
  .then(function (resp) {
  	return resp.json();
  })
  .then(function(data) {
  	var moneyToChangeSelected;

  	var moneyToChangeOptions = document.querySelectorAll('#moneyToChange option');
    
    document.getElementById('moneyToChange').addEventListener('change', moneyChangedOptionsFunc);
    
    var currentCourseArr = [];
			for(var i = 1; i < moneyToChange.length; i++) {
    		currentCourseArr.push(moneyToChange[i].value);
    	}

		var objOfRates = {"RUB": 1};
    	for(var j = 1; j < currentCourseArr.length; j++) {
    		var key = currentCourseArr[j];
      	objOfRates[key] = data.Valute[key].Value;
     	};
      
    
    function moneyChangedOptionsFunc() {
    	var fragment = document.createDocumentFragment();
      for(i = 0; i < moneyToChangeOptions.length; i++) {
      	if(moneyToChangeOptions[i].selected == false && moneyToChangeOptions[i].disabled == false) {
        	var moneyChangedOptionCreate = document.createElement('option');
          moneyChangedOptionCreate.innerHTML = moneyToChangeOptions[i].innerHTML;
          moneyChangedOptionCreate.value = moneyToChangeOptions[i].value;
          fragment.appendChild(moneyChangedOptionCreate);
        }
      }
      moneyChanged.innerHTML = '<option id ="disabledOption" disabled>Converte to</option>';
      moneyChanged.appendChild(fragment);
  	} 
     
     btn.addEventListener('click', countForResult);
     
    function countForResult() {
    	var moneyChangedOptions = document.querySelectorAll('#moneyChanged option');
     	var sumOfMoney = input.value;
      var typeOfMoneyToConvert = '';
      for(var i = 0; i < moneyToChangeOptions.length; i ++) {
      	if(moneyToChangeOptions[i].selected == true && moneyToChangeOptions[i].disabled == false) {
        typeOfMoneyToConvert = moneyToChangeOptions[i].innerHTML;
        }
      }
      
      	var typeOfMoneyToBeConverted = '';
        for(var j = 0; j < moneyChangedOptions.length; j++) {
        	if(moneyChangedOptions[j].selected == true && moneyChangedOptions[j].disabled == false) {
          	typeOfMoneyToBeConverted = moneyChangedOptions[j].innerHTML;
          }
        }
			result.innerHTML = (Number(input.value) * Number(objOfRates[typeOfMoneyToConvert]) / Number(objOfRates[typeOfMoneyToBeConverted])).toFixed(2);

     };
  });