
let temperature = document.getElementById("temp")





const api = "http://api.openweathermap.org/data/2.5/forecast?id=5506956&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"//units=imperial //make sure it comes back in Fahrenheire


function getWeather() {
	fetch(api)
  		.then(response => {
  			if(response.status !== 200) {
        		console.log(response.status);
        		return;
      		}
      		response.json()
  				.then(data => {
  				console.log(data.list.filter(item => item.dt == 1527541200))
  				})
		})
}

console.log(getWeather())



///apixu.com