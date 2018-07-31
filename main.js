const headline = document.getElementById("headline")
const timestamp = document.getElementById("time")
const datestamp = document.getElementById("date")
const bottomBar = document.getElementById("bottomBar")
const containerClmns = document.getElementById("containerClmns")
const container = document.getElementById("screen")


const apiId = "e8560a1109f936430203f88c4e09f8f1" //My api id for openweathermap.org

// const ccApi = "http://api.openweathermap.org/data/2.5/weather?id=5506956&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"//units=imperial //make sure it comes back in Fahrenheire
// const loApi = "http://api.openweathermap.org/data/2.5/find?lat=-115.14&lon=36.17&cnt=10&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"


function getWeather(c) { ///Eventually, c will be data passed to this function for any city in cityList so user can switch cities, for now, just Las Vegas, NV
	const lat = 36.17 //c.coord.lat
	const lon = -115.14 //c.coord.lon
	const cityName = "Las Vegas" //c.name
	const cityId = 5506956 //c.id

	
	var currentCondAPI = ////Gets current conditions for a given city ID
		fetch("http://api.openweathermap.org/data/2.5/weather?id="+cityId+"&units=imperial&APPID="+apiId)
  			.then(response => {
	  			if(response.status !== 200) {
	        		console.log("Current condition API: ", response.status)
	        		noData()
	        		return	      	
	      		} else {
	      			return response.json()
	      		}	
  			});	
  		

  	var localObsAPI = ///Gets 7 weather stations current conditions based on lat and lon of the current conditions city
  		fetch("http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units=imperial&APPID="+apiId)
			.then(response => {
  				if(response.status !== 200) {
        			console.log("Local weather stations API: ", response.status)
        			noData()
        			return
      			} else {
		      		return response.json()		  		
		  		}
  			});

  	var forecastAPI = //Gets 5 day forecast for given city id
  		fetch("http://api.openweathermap.org/data/2.5/forecast?id="+cityId+"&units=imperial&APPID="+apiId)
			.then(response => {
  				if(response.status !== 200) {
        			console.log("5 day forecast API: ", response.status)
        			noData()
        			return
      			} else {
      				return response.json()
      			}
  			});

  	var combinedData = {"currentCondAPI": {}, "localObsAPI": {}, "forecastAPI": {}};

  	Promise.all([currentCondAPI, localObsAPI, forecastAPI]).then(data => {
  		combinedData["currentCondAPI"] = data[0];
  		combinedData["localObsAPI"] = data[1];
  		combinedData["forecastAPI"] = data[2];

  		console.log(combinedData)

  		main(combinedData) //Send it to my slideshow

  	})
};
  	



function getWindDirection(deg) { ///This figures out the correct direction based on meterological degrees
	if(deg >= 361 || deg == undefined) {
		return ""
	} else if(deg <= 22.5 || deg >= 337.6) {
		return "N"
	} else if(deg >= 22.6 && deg <= 68.5) {
		return "NE"
	} else if(deg >= 68.6 && deg <= 112.5) {
		return "E"
	} else if(deg >= 112.6 && deg <= 157.5) {
		return "SE"
	} else if(deg >= 157.6 && deg <= 202.5) {
		return "S"
	} else if(deg >= 202.6 && deg <= 247.5) {
		return "SW"
	} else if(deg >= 247.6 && deg <= 292.5) {
		return "W"
	} else if(deg >= 292.6 && deg <= 337.5) {
		return "NW"
	}
}

function returnCalm(speed, dir) { ///Simple function to return "Calm" if there is no wind
	if(speed < 1 || dir == "") {
		return "Calm"
	} else {
		return speed
	}
}

function returnMPH(ws) {  //Function to not display MPH is windspeed is calm
	if(ws === "Calm") {
		return ""
	} else {
		return "MPH"
	}
}


function returnGust(gust) { //Function to display gusts if there are any
	if(gust != undefined) {
		return "Gusts to " + Math.round(gust)
	} else {
		return ""
	}
}

function convertInHg(mb) {///Simple function to convert millibars to inches of Mercury, also still need to round this off to two decimals. mb * 0.0295300
	return Number(Math.round((mb * 0.0295300)+'e2')+'e-2');
}


function convertMeters(m) { //Function to convert kilometers into miles
	return Math.round(m * 0.000621)
}


function getTime() {  //Timestamp clock function as the top
	var now = new Date()
	var hour = now.getHours()
	var minute = now.getMinutes()
	var seconds = now.getSeconds()
	var amPm = "AM"

	if(hour == 0) {
		hour += 12
	}

	if(hour > 12) {
		hour -= 12
		amPm = "PM"
	}

	if(minute < 10) {
		minute = "0" + minute
	}

	if(seconds < 10) {
		seconds = "0" + seconds
	}

	const time = hour + ":" + minute + ":" + seconds + " " + amPm
	const date = now.toDateString().slice(0, 10)
	timestamp.innerHTML = `${time}`
	datestamp.innerHTML = `${date}`

}


function main(weatherData) {
	
	//Current conditions weather data////////////////////////////////////////////////////
	let temp = Math.round(weatherData.currentCondAPI.main.temp)
	let cond = weatherData.currentCondAPI.weather[0].description 
	let icon = weatherData.currentCondAPI.weather[0].icon
	let windDir = getWindDirection(weatherData.currentCondAPI.wind.deg)
	let windSpeed = returnCalm(Math.round(weatherData.currentCondAPI.wind.speed), windDir)
	let windGust = returnGust(weatherData.currentCondAPI.wind.gust)
	let curCity = weatherData.currentCondAPI.name
	let humid = weatherData.currentCondAPI.main.humidity
	let baro = convertInHg(weatherData.currentCondAPI.main.pressure)
	let visb = convertMeters(weatherData.currentCondAPI.visibility)
	let dt = new Date(weatherData.currentCondAPI.dt * 1000).toDateString()
	////////////////////////////////////////////////////////////////////////////////////
	
	slideshow2()
	footer()


	function slideshow2() {

		page1()
		setTimeout(function() {page2(weatherData.localObsAPI); }, 20000)
		setTimeout(function() {page3(weatherData.forecastAPI); }, 40000)


		function page1() { 			

			headline.innerHTML = `<div>Current<br />Conditions</div>`
			container.innerHTML = `
				<div class = "page1Box">
					<div class = "mainInfo">
						<div class = "tempBox">
							<h1 id = "temp">${temp}</h1><h1>°</h1>
						</div>
						<h2 id = "cond">${cond}</h2>
						<div id = "ccGif"><img class="gif" src="./Images/CurrentConditions/${icon}.gif"></div>
						<h3 id = "wind">Wind: ${windDir} ${windSpeed}</h3>
						<h3 id = "gust">${windGust}</h3>
					</div>
					<div class = "subInfo">
						<h3 id = "cityName">${curCity}</h3>
						<h3 id = "humidity">Humidity: ${humid}%</h3>
						<h3>Dewpoint: </h3>
						<h3>Ceiling: </h3>
						<h3 id = "visibility">Visibility: ${visb} mi</h3>
						<h3 id = "pressure">Pressure: ${baro}</h3>
						<h3>Heat Index: </h3>
					</div>
				</div>`
		};


		function page2(data){
			headline.innerHTML = `<div>Latest Observations</div`
			container.innerHTML = ''
			containerClmns.innerHTML = `
				<div class = "columnRow">
					<div class = "cityClmn"></div>
					<div class = "cityTempClmn">°F</div>
					<div class = "cityWeatherClmn">WEATHER</div>
					<div class = "cityWindClmn">WIND</div>
				</div>
			`	
			data.list.forEach(function(item) { 		
				let resultBlock = ''
				let wd = getWindDirection(item.wind.deg)
				let ws = returnCalm(Math.round(item.wind.speed), wd)
				
				resultBlock = `		
				<div class = "cityRow">
					<div class = "city">${abbreviator(item.name)}</div>
					<div class = "cityTemp">${Math.round(item.main.temp)}</div>
					<div class = "cityWeather">${abbreviator(item.weather[0].description)}</div>
					<div class = "cityWind">${wd}${ws}</div>
				</div>
				
				`
				container.innerHTML += resultBlock

				})

		};


		function page3(data){
			headline.innerHTML = `
				<div>${curCity} Metro</div>
				<div>Extended Forecast</div>
				`
			containerClmns.innerHTML = ``

			
			let hiLo = data.list.filter(threeDay)
			console.log(hiLo)
			let dayCond = data.list.filter(dayForecast)
			console.log(dayCond)

			let day1 = dayofWeek(new Date(hiLo[0].dt * 1000).getDay())
			let day2 = dayofWeek(new Date(hiLo[2].dt * 1000).getDay())
			let day3 = dayofWeek(new Date(hiLo[4].dt * 1000).getDay())



		
			container.innerHTML = `
				<div class = "forecast">
					<div class = "days">
						<div class = "day">${day1.substr(0, 3).toUpperCase()}</div>
						<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[0].weather[0].icon}.gif"></div>
						<div class = "dayCond">${dayCond[0].weather[0].description}</div>
						<div class = "tempsBox">
							<div class = "temps">
								<div class = "tempLo">Lo</div>
								<div class = "dayTemp">${Math.round(hiLo[0].main.temp)}</div>
							</div>
							<div class = "temps">
								<div class = "tempHi">Hi</div>
								<div class = "dayTemp">${Math.round(hiLo[1].main.temp)}</div>
							</div>
						</div>
					</div>
					<div class = "days">
						<div class = "day">${day2.substr(0, 3).toUpperCase()}</div>
						<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[1].weather[0].icon}.gif"></div>
						<div class = "dayCond">${dayCond[1].weather[0].description}</div>
						<div class = "tempsBox">
							<div class = "temps">
								<div class = "tempLo">Lo</div>
								<div class = "dayTemp">${Math.round(hiLo[2].main.temp)}</div>
							</div>
							<div class = "temps">
								<div class = "tempHi">Hi</div>
								<div class = "dayTemp">${Math.round(hiLo[3].main.temp)}</div>
							</div>
						</div>
					</div>
					<div class = "days">
						<div class = "day">${day3.substr(0, 3).toUpperCase()}</div>
						<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[2].weather[0].icon}.gif"></div>
						<div class = "dayCond">${dayCond[2].weather[0].description}</div>
						<div class = "tempsBox">
							<div class = "temps">
								<div class = "tempLo">Lo</div>
								<div class = "dayTemp">${Math.round(hiLo[4].main.temp)}</div>
							</div>
							<div class = "temps">
								<div class = "tempHi">Hi</div>
								<div class = "dayTemp">${Math.round(hiLo[5].main.temp)}</div>
							</div>
						</div>
					</div>
				</div>
				`
		};
	};

	var endSlideShow2 = setInterval(slideshow2, 60000)
	setInterval(function() { 
		clearInterval(endSlideShow2)
		container.innerHTML = ``
		}, 600000)



	function footer() {
	  //Data slideshow at the footer, current data gets passed to it, then executes the actual slideshow with another function inside
	slideshow()
	
	function slideshow() {
		let mph = returnMPH(windSpeed)
		
		order1()
		setTimeout(order2, 4000)
		setTimeout(order3, 8000)
		setTimeout(order4, 12000)
		setTimeout(order5, 16000)
		setTimeout(order6, 20000)
		setTimeout(order7, 24000)
		setTimeout(order8, 28000)
	

		//Slide order: 1. Conditions at ${city}, 2. ${cond}, 3. Temp: ${temp}°F, 4. Humidity: ${humid}%  Dewpoint: ${}, 5. Barometric Pressure: ${baro}F, 6. Wind: ${windDir} ${windSpeed} MPH, 7. Visib: ${visb} mi.  Ceiling: ${}, 8. ${month} Precipitation: ${}


			function order1() {
				bottomBar.innerHTML = `Conditions at ${curCity}`
			}
			
		 	function order2() {
				bottomBar.innerHTML = `${cond}`
			}

			function order3() {
				bottomBar.innerHTML = `Temp: ${temp}°F`
			}

			function order4() {
				bottomBar.innerHTML = `Humidity: ${humid}%  Dewpoint:`//here would be dewpoint if we had it :(
			}

			function order5() {
				bottomBar.innerHTML = `Barometric Pressure: ${baro}`//Need a function here to see if pressure is falling, dropping, or sustaning.
			}

			function order6() {
				bottomBar.innerHTML = `Wind: ${windDir} ${windSpeed} ${mph}`
			}

			function order7() {
				bottomBar.innerHTML = `Visib: ${visb} mi.  Ceiling:`//Need a data point for ceiling, eventually.
			}

			function order8() {
				bottomBar.innerHTML = `${dt.slice(3, 7)} Precipitation:` //Need a data point for precip, eventually.
			}
	}

	var endSlideShow = setInterval(slideshow, 32000)
	setInterval(function() { 
		clearInterval(endSlideShow) 
		bottomBar.innerHTML = ``
		}, 600000)		
	}

};









function noData() { ///Will display if no data reports, or if error.
	container.innerHTML = `
			<div class = "noData">
				<h1>No Report Availiable</h1>
			</div>`
}


getTime()
getWeather()

setInterval(getTime, 1000)
setInterval(getWeather, 600000)
// setInterval(function() {
// 	clearInterval(getWeather)
// 	mainBox.innerHTML = ``
// 	bottomBar.innerHTML = ``
// 	}, 50000)//a little note, I had to have this function run in line with the slideshow function intervals in order to not have alignment issues.

///apixu.com



//trying to write a function a take temp and humidity to figure out dewpoint.
function dp(T, RH) {
    var tA = Math.pow(RH/100,1/8);
    return ((112 + (0.9 * T))) * tA + (0.1 * T) - 112;
};




function abbreviator(word) {
	let wordLength = word.length
	if(word.endsWith("Air Force Base")) {
		return word.substr(0, (wordLength - 14)) + " " + "AFB"
	} else if(word.startsWith("scattered")) {
		return "Sct'd" + "" + word.substr(9, wordLength)
	} else {
		return word
	}

}


function threeDay(item) {
	let now = new Date().getDay()
	let itemHour = new Date(item.dt * 1000).getHours()
	let itemDay = new Date(item.dt * 1000).getDay()

	if(itemHour == 5 || itemHour == 14 && itemDay !== now) { ///Keep in mind, dt in the data is based on GMT +7 hours
		return true;
	} else {
	return false;
	}	
}

function dayForecast(item) {
	let itemHour = new Date(item.dt * 1000).getHours()
	if(itemHour == 14) { ///Keep in mind, dt in the data is based on GMT +7 hours
		return true;
	} else {
	return false;
	}	
}

function dayofWeek(d) {
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	return days[d]
}












