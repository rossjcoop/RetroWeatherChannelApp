const headline = document.getElementById("headline")
const timestamp = document.getElementById("time")
const datestamp = document.getElementById("date")
const bottomBar = document.getElementById("bottomBar")
const mainBox = document.getElementById("mainBox")

const ccApi = "http://api.openweathermap.org/data/2.5/weather?id=5506956&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"//units=imperial //make sure it comes back in Fahrenheire
const loApi = "http://api.openweathermap.org/data/2.5/find?lat=-115.14&lon=36.17&cnt=10&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"


function getWeather(c) {  ///Eventually, I will feed this function a given city either via dialogue box, or more clever, using current location.
	fetch(ccApi)
  		.then(response => {
  			if(response.status !== 200) {
        		console.log(response.status)
        		noData()
        		return;
      		}
      		response.json()
  				.then(data => {
  				console.log(data)
  				let temp = Math.round(data.main.temp)
  				let cond = data.weather[0].description 
  				let icon = data.weather[0].icon
  				let windDir = getWindDirection(data.wind.deg)
  				let windSpeed = returnCalm(Math.round(data.wind.speed), windDir)
  				let windGust = returnGust(data.wind.gust)
  				let curCity = data.name
  				let humid = data.main.humidity
  				let baro = convertInHg(data.main.pressure)
  				let visb = convertMeters(data.visibility)
  				let dt = new Date(data.dt * 1000).toDateString()
  				let lat = data.coord.lat
  				let lon = data.coord.lon


  				page1(temp, cond, icon, windDir, windSpeed, windGust, curCity, humid, baro, visb, dt)
  				footer(temp, cond, windDir, windSpeed, curCity, humid, baro, visb, dt)
  				setTimeout(function() {getRegionalObs(lat, lon); }, 10000)

  				})
		})
}

function getRegionalObs(lat, lon) {
	fetch("http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1")
		.then(response => {
  			if(response.status !== 200) {
        		console.log(response.status);
        		return;
      		}
      		response.json()
  				.then(data => {
  					console.log(data)
  					page2(data)
  				})
  		})
}



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

function footer(temp, cond, windDir, windSpeed, curCity, humid, baro, visb, dt) {  //Data slideshow at the footer, current data gets passed to it, then executes the actual slideshow with another function inside
	bottomBar.innerHTML = ""
	slideshow()
	function slideshow() {
		let mph = returnMPH(windSpeed)
		order1()
		setTimeout(order1, 5000)
		setTimeout(order2, 10000)
		setTimeout(order3, 15000)
		setTimeout(order4, 20000)
		setTimeout(order5, 25000)
		setTimeout(order6, 30000)
		setTimeout(order7, 35000)
		setTimeout(order8, 40000)
	

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

	setInterval(slideshow, 45000)		
}




function page1(temp, cond, icon, windDir, windSpeed, windGust, curCity, humid, baro, visb, dt) { 
	headline.innerHTML = `<div>Current<br />Conditions</div>`
	mainBox.innerHTML = `
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
}

function page2(data){
	headline.innerHTML = `<div>Latest Observations</div`
	mainBox.innerHTML = ''	
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
		mainBox.innerHTML += resultBlock

		})

}






function noData() { ///Will display if no data reports, or if error.
	mainBox.innerHTML = `
			<div class = "noData>
				<h1>No Report Availiable</h1>
			</div>`
}


getTime()
getWeather()

setInterval(getTime, 1000)
setInterval(getWeather, 450000) //a little note, I had to have this function run in line with the slideshow function intervals in order to not have alignment issues.

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
	} else if(word.startsWith("Scattered")) {
		return "Sct'd" + "" + word.substr(8, wordLength)
	} else {
		return word
	}

}



