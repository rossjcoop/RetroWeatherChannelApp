
let temperature = document.getElementById("temp")





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
  				console.log(data.main.temp)
  				console.log(data)
  				let temp = data.main.temp
  				temperature.innerHTML = `${temp}`
  				})
		})
}

console.log(getWeather())



///apixu.com


