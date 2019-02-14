
///openweathermap api


function getWeatherCord() { ///Pulls in data via cordinates provided by the browser
	
	let currentCondAPI = ////Gets current conditions 
		fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units="+units+"&APPID="+apiId)
  			.then(response => {
	  			if(response.status !== 200) {
	        		console.log("Current condition API: ", response.status)
	        		return	      	
	      		} else {
	      			return response.json()
	      		}	
  			});	
  		

  	let localObsAPI = ///Gets 7 weather stations current conditions based on lat and lon of the current conditions city
  		fetch("https://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units="+units+"&APPID="+apiId)
			.then(response => {
  				if(response.status !== 200) {
        			console.log("Local weather stations API: ", response.status)
        			return
      			} else {
		      		return response.json()		  		
		  		}
  			});

  	let forecastAPI = //Gets 5 day forecast
  		fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units="+units+"&APPID="+apiId)
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
		  setWeather(combinedData)
		  main(combinedData) //Send it to my slideshow
		  
  	})
};


function getWeatherZip() { ///Or pulls weather data via zip code and country
	let combinedData = {"currentCondAPI": {}, "localObsAPI": {}, "forecastAPI": {}};
	
	// let currentCondAPI = ////Gets current conditions 
		fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zip+","+ctry+"&units="+units+"&APPID="+apiId)
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
							fetch("https://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units="+units+"&APPID="+apiId)
								.then(response => {
									if(response.status !== 200) {
										console.log("Local weather stations API: ", response.status)
										return
									} else {
										return response.json()
									}		  		
								});
			  
						let forecastAPI = //Gets 5 day forecast
							fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units="+units+"&APPID="+apiId)
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
							setWeather(combinedData)
							main(combinedData) //Send it to my slideshow
							
						})
					});
		
				}	  
  			})	  
};


function setWeather(d) {
	
  lo = []///Let's clear out the arrays when new data arrives
	ef = []
	
  let curCon = d.currentCondAPI // Current Conditions API
	let loObs = d.localObsAPI.list // Local Observations API
	let extFc = d.forecastAPI.list // Extended Forecast API
	
  ///Setting Global Variables
  city = curCon.name
	ccTemp = Math.round(curCon.main.temp)
	ccCond = loAbbreviator(curCon.weather[0].description, curCon.weather[0].icon)
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
			"name": abbreviator(item.name),
			"temp": Math.round(item.main.temp),
			"weather": loAbbreviator(item.weather[0].description, item.weather[0].icon),
			"wind": formatWind(item.wind.speed, item.wind.deg)
		})
	})

	// let hiLo = extFc.filter(threeDay)
	// let dayCond = data.list.filter(dayForecast)

	forecast(extFc)
};

function forecast(arr) {
	let today = new Date().getDay()	
	let time = new Date().getTime()
	let dayInMilsecs = 86400000
	let day1 = new Date(time + dayInMilsecs).getDay()
	let day2 = new Date(time + (dayInMilsecs * 2)).getDay()
	let day3 = new Date(time + (dayInMilsecs * 3)).getDay()
	//86400000 milliseconds in a day
	//259200000 milliseconds in 3 days
	let day1Arr = [];
	let day2Arr = [];
	let day3Arr = [];

	// day1Arr.flat().filter(filterHiLo);
	// day2Arr.forEach(filterHiLo);
	// day3Arr.forEach(filterHiLo);

	



	let threeDayNew = arr.filter(filterer);
	
	// console.log(day1Arr, day2Arr, day3Arr)
	
	function filterer(item) {		///First, we'll filter out data only the next three days from today			
		let itemHour = new Date(item.dt * 1000).getHours()
		let itemDay = new Date(item.dt * 1000).getDay()
		let itemTime = new Date(item.dt * 1000)
		if(itemDay == day1) {
			day1Arr.push(item)
			return true
		} else if(itemDay == day2) {
			day2Arr.push(item)
			return true
		} else if(itemDay == day3) {
			day3Arr.push(item)
			return true
		} else {
			return false
		}
	}



	let day1HiLo = highLow(day1Arr.map(item => item.main.temp))
	let day2HiLo = highLow(day2Arr.map(item => item.main.temp))
	let day3HiLo = highLow(day3Arr.map(item => item.main.temp))

	let day1Cond = commonCond(day1Arr.filter(item => item.weather[0].icon.endsWith('d')).map(item => item.weather[0].description))
	let day2Cond = commonCond(day2Arr.map(item => item.weather[0].description))
	let day3Cond = commonCond(day3Arr.map(item => item.weather[0].description))

	let day1Icon = commonCond(day1Arr.map(item => item.weather[0].icon).filter(item => item.endsWith('d')))
	let day2Icon = commonCond(day2Arr.map(item => item.weather[0].icon).filter(item => item.endsWith('d')))
	let day3Icon = commonCond(day3Arr.map(item => item.weather[0].icon).filter(item => item.endsWith('d')))

	// console.log(day1HiLo, day2HiLo, day3HiLo)
	console.log(day1Cond, day2Cond, day3Cond)
	console.log(day1Icon, day2Icon, day3Icon)

	///Second will be a function to figure out the highest and lowest temps of the day
	///Will feed it an array of numbers and find the highest and lowest numbers
	function highLow(array) {
		let largest = Math.round(Math.max.apply(Math, array));
		let smallest = Math.round(Math.min.apply(Math, array));
		return [largest, smallest]
	}


	function commonCond(arr) {
		return arr.sort((a,b) =>
		arr.filter(v => v===a).length - arr.filter(v => v===b).length
  		).pop();
	}
	
	ef = [
		{
			"day": dayofWeek(day1).substr(0, 3).toUpperCase(),
			"condition": day1Cond,
			"icon": day1Icon,
			"high": day1HiLo[0],
			"low": day1HiLo[1],
		},
		{
			"day": dayofWeek(day2).substr(0, 3).toUpperCase(),
			"condition": day2Cond,
			"icon": day2Icon,
			"high": day2HiLo[0],
			"low": day2HiLo[1],
		},
		{
			"day": dayofWeek(day3).substr(0, 3).toUpperCase(),
			"condition": day3Cond,
			"icon": day3Icon,
			"high": day3HiLo[0],
			"low": day3HiLo[1],
		}
	]

}

const conditionCodes = [
  {
    id: 200,
    condition: "Thunderstorm",
    shortCond: "T-Storm",
  },
  { id: 201,
    condition: "Thunderstorm",
    shortCond: "T-Storm",
  },
  {
    id: 202,
    condition: "Thunderstorm",
    shortCond: "T-Storm",
  },
  {
    id: 210,
    condition: "Thunderstorm",
    shortCond: "T-Storm",
  },
  {
    id: 211,
    condition: "Thunderstorm",
    shortCond: "T-Storm",
  }
]




