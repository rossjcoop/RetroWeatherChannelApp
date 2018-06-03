
let temperature = document.getElementById("temp")
let conditions = document.getElementById("cond")
let ccGif = document.getElementById("ccGif")
let wind = document.getElementById("wind")
let city = document.getElementById("cityName")
let humidity = document.getElementById("humidity")
let pressure = document.getElementById("pressure")
let vis = document.getElementById("visibility")
let timestamp = document.getElementById("time")
let datestamp = document.getElementById("date")





const api = "http://api.openweathermap.org/data/2.5/weather?id=5506956&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"//units=imperial //make sure it comes back in Fahrenheire


function getWeather(c) {
	fetch(api)
  		.then(response => {
  			if(response.status !== 200) {
        		console.log(response.status);
        		return;
      		}
      		response.json()
  				.then(data => {
  				// console.log(data.list.filter(item => item.dt == 1527541200))
  				console.log(data)
  				let temp = Math.round(data.main.temp)
  				let cond = data.weather.reduce(item => item == "main").description 
  				let icon = data.weather.reduce(item => item == "main").icon
  				let windDir = getWindDirection(data.wind.deg)
  				let windSpeed = returnCalm(Math.round(data.wind.speed), windDir)
  				let curCity = data.name
  				let humid = data.main.humidity
  				let baro = convertInHg(data.main.pressure)
  				let visb = convertMeters(data.visibility)


  				temperature.innerHTML = `${temp}°`
  				conditions.innerHTML = `${cond}`
  				ccGif.innerHTML = `<img class="gif" src="./Images/CurrentConditions/${icon}.gif">`
  				wind.innerHTML = `Wind: ${windDir} ${windSpeed}`
  				city.innerHTML = `${curCity}`
  				humidity.innerHTML = `Humidity: ${humid}%`
  				pressure.innerHTML = `Pressure: ${baro}`
  				vis.innerHTML = `Visibility: ${visb} mi`



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
	} else if (deg >= 247.6 && deg <= 292.5) {
		return "W"
	} else if (deg >= 292.6 && deg <= 337.5) {
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

function convertInHg(mb) {///Simple function to convert millibars to inches of Mercury, also still need to round this off to two decimals.
	return mb * 0.0295300
}


function convertMeters(m) {
	return Math.round(m * 0.000621)
}


function getTime() {
	const now = new Date()
	// const month = now.getMonth()
	// const date = now.getDate()
	// const day = now.getDay()
	// const hour = now.getHours()
	// const minute = now.getMinutes()
	// const seconds = now.getSeconds()
	const time = now.toTimeString().slice(0, 8)
	const date = now.toDateString().slice(0, 10)
	timestamp.innerHTML = `${time}`
	datestamp.innerHTML = `${date}`

}

getTime()
setInterval(getTime, 1000)
getWeather()
setInterval(getWeather, 600000)


///apixu.com


