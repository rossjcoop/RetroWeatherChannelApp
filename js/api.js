function getWeatherCord() { ///Pulls in data via cordinates provided by the browser
	
	let currentCondAPI = ////Gets current conditions 
		fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
  			.then(response => {
	  			if(response.status !== 200) {
	        		console.log("Current condition API: ", response.status)
	        		return	      	
	      		} else {
	      			return response.json()
	      		}	
  			});	
  		

  	let localObsAPI = ///Gets 7 weather stations current conditions based on lat and lon of the current conditions city
  		fetch("http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units=imperial&APPID="+apiId)
			.then(response => {
  				if(response.status !== 200) {
        			console.log("Local weather stations API: ", response.status)
        			return
      			} else {
		      		return response.json()		  		
		  		}
  			});

  	let forecastAPI = //Gets 5 day forecast
  		fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
			.then(response => {
  				if(response.status !== 200) {
        			console.log("5 day forecast API: ", response.status)
        			return
      			} else {
      				return response.json()
      			}
  			});

  	let combinedData = {"currentCondAPI": {}, "localObsAPI": {}, "forecastAPI": {}};

  	Promise.all([currentCondAPI, localObsAPI, forecastAPI]).then(data => {
  		combinedData["currentCondAPI"] = data[0];
  		combinedData["localObsAPI"] = data[1];
  		combinedData["forecastAPI"] = data[2];

  		console.log(combinedData)
		  main(combinedData) //Send it to my slideshow
		  setWeather(combinedData)
  	})
};


function getWeatherZip() { ///Or pulls weather data via zip code and country
	let combinedData = {"currentCondAPI": {}, "localObsAPI": {}, "forecastAPI": {}};
	
	// let currentCondAPI = ////Gets current conditions 
		fetch("http://api.openweathermap.org/data/2.5/weather?zip="+zip+","+ctry+"&units=imperial&APPID="+apiId)
  			.then(response => {
	  			if(response.status !== 200) {
	        		console.log("Current condition API: ", response.status)
	        		return	      	
	      		} else {
	      			response.json().then(data => {
						combinedData["currentCondAPI"] = data
						lat = combinedData.currentCondAPI.coord.lat
						lon = combinedData.currentCondAPI.coord.lon					
					}).then(function() {
						
						let localObsAPI = ///Gets 7 weather stations current conditions based on lat and lon of the current conditions city
							fetch("http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units=imperial&APPID="+apiId)
								.then(response => {
									if(response.status !== 200) {
										console.log("Local weather stations API: ", response.status)
										return
									} else {
										return response.json()
									}		  		
								});
			  
						let forecastAPI = //Gets 5 day forecast
							fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
								.then(response => {
									if(response.status !== 200) {
										console.log("5 day forecast API: ", response.status)
										return
									} else {
										return response.json()
									}	
								});
						
						Promise.all([localObsAPI, forecastAPI]).then(data => {
							combinedData["localObsAPI"] = data[0];
							combinedData["forecastAPI"] = data[1];
							console.log(combinedData)
							main(combinedData) //Send it to my slideshow
						})
					});
		
				}	  
  			})	  
};


function setWeather(d) {
	lo = []
	let curCon = d.currentCondAPI // Current Conditions API
	let loObs = d.localObsAPI.list // Local Observations API
	let extFc = d.forecastAPI.list // Extended Forecast API

	ccTemp = Math.round(curCon.main.temp)
	ccCond = curCon.weather[0].description 
	ccIcon = curCon.weather[0].icon
	ccWindDir = getWindDirection(curCon.wind.deg)
	ccWindSpeed = returnCalm(Math.round(curCon.wind.speed), ccWindDir)
	ccwindGust = returnGust(curCon.wind.gust)
	ccCurCity = curCon.name
	ccHumid = curCon.main.humidity
	ccBaro = convertInHg(curCon.main.pressure)
	ccVisb = convertMeters(curCon.visibility)
	ccDt = new Date(curCon.dt * 1000).toDateString()

	loObs.forEach(item => {
		lo.push({
			"name": item.name,
			"temp": Math.round(item.main.temp),
			"weather": abbreviator(item.weather[0].description),
			"wind": formatWind(item.wind.speed, item.wind.deg)
		})
	})

	// let hiLo = extFc.filter(threeDay)
	// let dayCond = data.list.filter(dayForecast)
};

function forecast(arr) {
	let today = new Date().getDay()	
	let time = new Date().getTime()
	//86400000 milliseconds in a day
	//259200000 milliseconds in 3 days
	let threeDay = arr.filter(filterer)

	let day1 = []
	let day2 = []
	let day3 = []


	function filterer(item) {		///First will be a time filterer			
		let itemHour = new Date(item.dt * 1000).getHours()
		let itemDay = new Date(item.dt * 1000).getDay()
		let itemTime = new Date(item.dt * 1000)
		if(itemDay !== today && (itemDay - today < 3 || itemDay - today <= -3)) {
			return true
		}
	}


	///Second will be a function to figure out the highest and lowest temps of the day
	///Will feed it an array of numbers and find the highest and lowest numbers
	function highLow(array) {
		let largest = Math.max.apply(Math, array);
		let smallest = Math.min.apply(Math, array);
		return [largest, smallest]
	}


	
	
	

	///END RESULT EVENTUALLY...Then the
	ef = [
		{
			"day": "TUE",//Just the day of the data
			"cond": "clear skies", ///Takes all the conditions for a period between 9am and 5pm and finds the most common
			"hiTemp": 75,//// Takes all the temps for a 24 hour period and finds the highest and lowest temperature
			"loTemp": 56,
		},
		{
			"day": "WED",
			"cond": "clear skies",
			"hiTemp": 80,
			"loTemp": 61,
		},
		{
			"day": "THU",
			"cond": "clear skies",
			"hiTemp": 82,
			"loTemp": 63,
		}
	]

}

//map through the array forecast and push only the vital

