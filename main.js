
let temperature = document.getElementById("temp")
let conditions = document.getElementById("cond")
let ccGif = document.getElementById("ccGif")
let wind = document.getElementById("wind")
let city = document.getElementById("cityName")





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
  				let cond = data.weather.reduce(item => item == "main").main
  				let icon = data.weather.reduce(item => item == "main").icon
  				let windSpeed = returnCalm(Math.round(data.wind.speed))
  				let windDir = getWindDirection(data.wind.deg)
  				let curCity = data.name


  				temperature.innerHTML = `${temp}°`
  				conditions.innerHTML = `${cond}`
  				ccGif.innerHTML = `<img class="gif" src="./Images/CurrentConditions/${icon}.gif">`
  				wind.innerHTML = `Wind: ${windDir} ${windSpeed}`
  				city.innerHTML = `${curCity}`


  				})
		})
}

console.log(getWeather())



function getWindDirection(deg) { ///This figures out the correct direction based on meterological degrees
	if(deg >= 361 || NaN) {
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
		return "E"
	} else if(deg >= 202.6 && deg <= 247.5) {
		return "SW"
	} else if (deg >= 247.6 && deg <= 292.5) {
		return "W"
	} else if (deg >= 292.6 && deg <= 337.5) {
		return "NW"
	}
}

function returnCalm(speed) { ///Simple function to return "Calm" if there is no wind
	if(speed < 1) {
		return "Calm"
	} else {
		return speed
	}
}








///apixu.com


