
let temperature = document.getElementById("temp")
let conditions = document.getElementById("cond")
let ccGif = document.getElementById("ccGif")
let wind = document.getElementById("wind")





const api = "http://api.openweathermap.org/data/2.5/weather?id=5506956&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"//units=imperial //make sure it comes back in Fahrenheire


function getWeather(city) {
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
  				let windSpeed = returnCalm(Math.round(data.wind.speed))
  				let windDir = getWindDirection(data.wind.deg)

  				temperature.innerHTML = `${temp}`
  				conditions.innerHTML = `${cond}`
  				ccGif.innerHTML = `<img class="gif" src="./Images/CurrentConditions/${cond}.gif">`
  				wind.innerHTML = `Wind: ${windDir} ${windSpeed}`


  				})
		})
}

console.log(getWeather())



function getWindDirection(deg) { ///This figures out the correct direction based on meterological degrees
	if(deg >= 361 || NaN) {
		return "Err"
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
	if(speed = 0) {
		return "Calm"
	} else
		return speed
}


///apixu.com


