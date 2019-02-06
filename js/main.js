



// const ccApi = "http://api.openweathermap.org/data/2.5/weather?id=5506956&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"//units=imperial //make sure it comes back in Fahrenheire
// const loApi = "http://api.openweathermap.org/data/2.5/find?lat=-115.14&lon=36.17&cnt=10&units=imperial&APPID=e8560a1109f936430203f88c4e09f8f1"



////Browser now taking in user's location and can be feed into cords more accurately!

// window.onload = function() {
//   	var startPos;
//   	var geoSuccess = function(position) {
//     startPos = position;
//     // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//     // document.getElementById('startLon').innerHTML = startPos.coords.longitude;

//     console.log("Lat: ", startPos.coords.latitude)
//     console.log("Lon: ", startPos.coords.longitude)
//     lat = startPos.coords.latitude
//     lon = startPos.coords.longitude
//     getWeather()
//   	};

//   navigator.geolocation.getCurrentPosition(geoSuccess);
// };




// function getWeather(c) { ///Eventually, c will be data passed to this function for any city in cityList so user can switch cities, for now, just Las Vegas, NV
// 	// const lat = 36.17 //c.coord.lat
// 	// const lon = -115.14 //c.coord.lon
// 	const cityName = "Las Vegas" //c.name
// 	const cityId = 5506956 //c.id

	
// 	var currentCondAPI = ////Gets current conditions for a given city ID
// 		fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
//   			.then(response => {
// 	  			if(response.status !== 200) {
// 	        		console.log("Current condition API: ", response.status)
// 	        		noData()
// 	        		return	      	
// 	      		} else {
// 	      			return response.json()
// 	      		}	
//   			});	
  		

//   	var localObsAPI = ///Gets 7 weather stations current conditions based on lat and lon of the current conditions city
//   		fetch("http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units=imperial&APPID="+apiId)
// 			.then(response => {
//   				if(response.status !== 200) {
//         			console.log("Local weather stations API: ", response.status)
//         			noData()
//         			return
//       			} else {
// 		      		return response.json()		  		
// 		  		}
//   			});

//   	var forecastAPI = //Gets 5 day forecast for given city id
//   		fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
// 			.then(response => {
//   				if(response.status !== 200) {
//         			console.log("5 day forecast API: ", response.status)
//         			noData()
//         			return
//       			} else {
//       				return response.json()
//       			}
//   			});

//   	var combinedData = {"currentCondAPI": {}, "localObsAPI": {}, "forecastAPI": {}};

//   	Promise.all([currentCondAPI, localObsAPI, forecastAPI]).then(data => {
//   		combinedData["currentCondAPI"] = data[0];
//   		combinedData["localObsAPI"] = data[1];
//   		combinedData["forecastAPI"] = data[2];

//   		console.log(combinedData)

//   		main(combinedData) //Send it to my slideshow

//   	})
// };

window.onload = function() {
	startPage()
	getTime()	
	setInterval(getTime, 1000)
};
  	
function startPage() {
    headline.innerHTML = `
    <div class="headlineTop">Set Up Menu</div>`
    container.innerHTML = `   
        <div>
            <div class="startSect">
                <label>Select Your Location</label>
                    <div>
                        <input type="radio" name="selLoc" value="" rel="zipButton"><input type="text" placeholder="Enter Zip" rel="zipInput">
                        <select>
                            <option rel="ctrySel" value="US">USA</option>
                        <select>
                        <input type="radio" name="selLoc" value="" rel="locButton">Use My Location
                    </div>
                    <div>
                       
                    </div>
            </div>
            <div class="startSect">
                <label>Slideshow Settings:</label>
                    <div>
                        <input type="checkbox" rel="musicOn">Music?
                        <label>Select Track</label>
                            <select rel="cdPlayer">
                                <option value="Files/Music/Overcast.mp3">Overcast</option>
                                <option value="Files/Music/Casio_Blues.mp3">Casio Blues</option>
                                <option value="Green Tea.mp3">Green Tea</option>
                                <option value="Custom Link">Custom Link</option>
                            </select>
                        <label>URL for MP3</label>
                            <input type="text" placeholder="Enter URL" rel="mp3URL" disabled>
                    </div>
                    <div>
                        <label>Slide Speed</label>
                            <select>
                                <option value="5">5 secs</option>
                                <option value="10">10 secs</option>
                                <option value="15">15 secs</option>
                                <option value="20">20 secs</option>
                            </select>
                    </div>
                    <div>
                        <label>Units</label>
                            <select rel="unitSelector">
                                <option value="imperial">Fahrenheit</option>
                                <option value="metric">Celsius</option>
                            </select>
                    </div>
            </div>
            <div>
            </div>
            <input type="submit" value="Start" rel="start">
        </div>     
    `
    let zipSelect = document.querySelector('[rel="zipButton"]')
    let cordSelect = document.querySelector('[rel="locButton"]')
	let zipInput = document.querySelector('[rel="zipInput"]')
	let ctrySel = document.querySelector('[rel="ctrySel"]')
    // let zipSubmit = document.querySelector('[rel="zipSubmit"]')
    // let cordSubmit = document.querySelector('[rel="locationSubmit"]') 
    let submit = document.querySelector('[rel="start"]')
    let musicOn = document.querySelector('[rel="musicOn"]')
    let musicTrack = document.querySelector('[rel="cdPlayer"]')
    let musicURL = document.querySelector('[rel="mp3URL')
    let unitSelector = document.querySelector('[rel="unitSelector')

    submit.addEventListener('click', function(event) {
        setMusicVariables();
        if(zipSelect.checked == true) {
            console.log("hit zip")
            zip = zipInput.value
            ctry = ctrySel.value
            getWeatherZip()
            setInterval(function() {
                getWeatherZip()
            }
            , 600000)   
        } else if(cordSelect.checked == true) {
            console.log("Hit cord")
            var startPos;
            var geoSuccess = function(position) {
                startPos = position;
                console.log("Lat: ", startPos.coords.latitude)
                console.log("Lon: ", startPos.coords.longitude)
                lat = startPos.coords.latitude
                lon = startPos.coords.longitude
                getWeatherCord()
                setInterval(function() {
                    getWeatherCord()}
                    , 600000)
            };
            navigator.geolocation.getCurrentPosition(geoSuccess)

        } else {
            alert("You must either enter a zip or use your current location.")
        }        
    })

    // zipSelect.addEventListener('click', function(event) {
    //     console.log(zipSelect.checked)
    // })

    // cordSelect.addEventListener('click', function(event) {
    //     console.log(cordSelect.checked)
    // })

    // cordSubmit.addEventListener('click', function(event) {
    //     event.preventDefault
    //     var startPos;
    //     var geoSuccess = function(position) {
    //         startPos = position;
    //         console.log("Lat: ", startPos.coords.latitude)
    //         console.log("Lon: ", startPos.coords.longitude)
    //         lat = startPos.coords.latitude
    //         lon = startPos.coords.longitude
	// 		getWeatherCord()
	// 		setInterval(function() {
	// 			getWeatherCord()}
	// 			, 600000)
    //     };
	// 	navigator.geolocation.getCurrentPosition(geoSuccess)
    // });

    musicOn.addEventListener('change', function(event) {
        event.preventDefault
        music = musicOn.checked
        console.log(music)
    })

    musicTrack.addEventListener('change', function(event) {
        event.preventDefault     
        if(musicTrack.value === "Custom Link") {
            musicURL.disabled = false////need to change the property of the url input tag to enabled when it is selected in the dropdown...
        } else {
            musicURL.disabled = true
        }
    })


    function setMusicVariables() {
    music = musicOn.checked
    if(musicTrack.value === "Custom Link") {
        track = musicURL.value
    } else {
        track = musicTrack.value
    }

    }

    unitSelector.addEventListener('change', function(event) {
        event.preventDefault
        units = unitSelector.value
        unitDisplay = fC()
    })
};




// function main() {
	
// 	//Current conditions weather data////////////////////////////////////////////////////
// 	let temp = Math.round(weatherData.currentCondAPI.main.temp)
// 	let cond = weatherData.currentCondAPI.weather[0].description 
// 	let icon = weatherData.currentCondAPI.weather[0].icon
// 	let windDir = getWindDirection(weatherData.currentCondAPI.wind.deg)
// 	let windSpeed = returnCalm(Math.round(weatherData.currentCondAPI.wind.speed), windDir)
// 	let windGust = returnGust(weatherData.currentCondAPI.wind.gust)
// 	let curCity = weatherData.currentCondAPI.name
// 	let humid = weatherData.currentCondAPI.main.humidity
// 	let baro = convertInHg(weatherData.currentCondAPI.main.pressure)
// 	let visb = convertMeters(weatherData.currentCondAPI.visibility)
// 	let dt = new Date(weatherData.currentCondAPI.dt * 1000).toDateString()
// 	////////////////////////////////////////////////////////////////////////////////////
	

// 	 ///////////////Just had a thought, to store the barometric pressure in local storage, this will reference whether pressure is going up or down
// 	slideshow2()
// 	footer()


// 	function slideshow2() {

// 		page1()
// 		setTimeout(function() {page2(weatherData.localObsAPI); }, 20000)
// 		setTimeout(function() {page3(weatherData.forecastAPI); }, 40000)


// 		function intro() {
// 			headline.innerHTML = `
// 			<div class="headlineTop">Select Your Location</div>`
// 			container.innerHTML = `
// 			<div class="selectBox"></div>
// 				<div class="selectZip">
// 					<input type="text" placeholder="Enter Zip" rel="zipInput">
// 					<input type="submit" value="Submit" rel="zipSubmit">
// 				</div>
// 			</div>`
// 		}

// 		function page1() { 			
// 			desktop.style.backgroundColor = "rgb(36, 43, 90)";
// 			desktop.style.boxShadow = "inset 0 0 75px rgb(83, 90, 125)";
// 			containerClmns.style.display = "none";
// 			headline.innerHTML = `
// 				<div class="headlineTop">Current</div>
// 				<div class="headlineBottom">Conditions</div>`
// 			container.innerHTML = `
// 				<div class = "page1Box">
// 					<div class = "mainInfo">
// 						<div class = "tempBox">
// 							<h1 id = "temp">${temp}</h1><h1>°</h1>
// 						</div>
// 						<h2 id = "cond">${cond}</h2>
// 						<div id = "ccGif"><img class="gif" src="./Images/CurrentConditions/${icon}.gif"></div>
// 						<h3 id = "wind">Wind: ${windDir} ${windSpeed}</h3>
// 						<h3 id = "gust">${windGust}</h3>
// 					</div>
// 					<div class = "subInfo">
// 						<h3 id = "cityName">${curCity}</h3>
// 						<h3 id = "humidity">Humidity: ${humid}%</h3>
// 						<h3>Dewpoint: </h3>
// 						<h3>Ceiling: </h3>
// 						<h3 id = "visibility">Visibility: ${visb} mi</h3>
// 						<h3 id = "pressure">Pressure: ${baro}</h3>
// 						<h3>Heat Index: </h3>
// 					</div>
// 				</div>`
// 		};


// 		function page2(data){
// 			containerClmns.style.display ="inline";
// 			headline.innerHTML = `<div class="headlineTop">Latest Observations</div`
// 			container.innerHTML = ''
// 			containerClmns.innerHTML = `
// 				<div class = "columnRow">
// 					<div class = "cityClmn"></div>
// 					<div class = "cityTempClmn">°F</div>
// 					<div class = "cityWeatherClmn">WEATHER</div>
// 					<div class = "cityWindClmn">WIND</div>
// 				</div>
// 			`	
// 			data.list.forEach(function(item) { 		
// 				let resultBlock = ''
// 				let wd = getWindDirection(item.wind.deg)
// 				let ws = returnCalm(Math.round(item.wind.speed), wd)
				
// 				resultBlock = `		
// 				<div class = "cityRow">
// 					<div class = "city">${abbreviator(item.name)}</div>
// 					<div class = "cityTemp">${Math.round(item.main.temp)}</div>
// 					<div class = "cityWeather">${abbreviator(item.weather[0].description)}</div>
// 					<div class = "cityWind">${wd}${ws}</div>
// 				</div>
				
// 				`
// 				container.innerHTML += resultBlock

// 				})

// 		};


// 		function page3(data){
// 			desktop.style.backgroundColor = "transparent";
// 			desktop.style.boxShadow = "none"
// 			containerClmns.style.display ="none";
// 			headline.innerHTML = `
// 				<div class="headlineTop" style="color: white;">${curCity}</div>
// 				<div class="headlineBottom">Extended Forecast</div>
// 				`
// 			containerClmns.innerHTML = ``

			
// 			let hiLo = data.list.filter(threeDay)
// 			// console.log(hiLo)
// 			let dayCond = data.list.filter(dayForecast)
// 			// console.log(dayCond)

// 			let day1 = dayofWeek(new Date(hiLo[0].dt * 1000).getDay())
// 			let day2 = dayofWeek(new Date(hiLo[2].dt * 1000).getDay())
// 			let day3 = dayofWeek(new Date(hiLo[4].dt * 1000).getDay())



		
// 			container.innerHTML = `
// 				<div class = "forecast">
// 					<div class = "days">
// 						<div class = "day">${day1.substr(0, 3).toUpperCase()}</div>
// 						<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[0].weather[0].icon}.gif"></div>
// 						<div class = "dayCond">${dayCond[0].weather[0].description}</div>
// 						<div class = "tempsBox">
// 							<div class = "temps">
// 								<div class = "tempLo">Lo</div>
// 								<div class = "dayTemp">${Math.round(hiLo[0].main.temp)}</div>
// 							</div>
// 							<div class = "temps">
// 								<div class = "tempHi">Hi</div>
// 								<div class = "dayTemp">${Math.round(hiLo[1].main.temp)}</div>
// 							</div>
// 						</div>
// 					</div>
// 					<div class = "days">
// 						<div class = "day">${day2.substr(0, 3).toUpperCase()}</div>
// 						<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[1].weather[0].icon}.gif"></div>
// 						<div class = "dayCond">${dayCond[1].weather[0].description}</div>
// 						<div class = "tempsBox">
// 							<div class = "temps">
// 								<div class = "tempLo">Lo</div>
// 								<div class = "dayTemp">${Math.round(hiLo[2].main.temp)}</div>
// 							</div>
// 							<div class = "temps">
// 								<div class = "tempHi">Hi</div>
// 								<div class = "dayTemp">${Math.round(hiLo[3].main.temp)}</div>
// 							</div>
// 						</div>
// 					</div>
// 					<div class = "days">
// 						<div class = "day">${day3.substr(0, 3).toUpperCase()}</div>
// 						<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[2].weather[0].icon}.gif"></div>
// 						<div class = "dayCond">${dayCond[2].weather[0].description}</div>
// 						<div class = "tempsBox">
// 							<div class = "temps">
// 								<div class = "tempLo">Lo</div>
// 								<div class = "dayTemp">${Math.round(hiLo[4].main.temp)}</div>
// 							</div>
// 							<div class = "temps">
// 								<div class = "tempHi">Hi</div>
// 								<div class = "dayTemp">${Math.round(hiLo[5].main.temp)}</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				`
// 		};
// 	};

// 	var endSlideShow2 = setInterval(slideshow2, 60000)
// 	setInterval(function() { 
// 		clearInterval(endSlideShow2)
// 		container.innerHTML = ``
// 		}, 600000)



// 	function footer() {
// 	  //Data slideshow at the footer, current data gets passed to it, then executes the actual slideshow with another function inside
// 	slideshow()
	
// 	function slideshow() {
// 		let mph = returnMPH(windSpeed)
		
// 		order1()
// 		setTimeout(order2, 4000)
// 		setTimeout(order3, 8000)
// 		setTimeout(order4, 12000)
// 		setTimeout(order5, 16000)
// 		setTimeout(order6, 20000)
// 		setTimeout(order7, 24000)
// 		setTimeout(order8, 28000)
	

// 		//Slide order: 1. Conditions at ${city}, 2. ${cond}, 3. Temp: ${temp}°F, 4. Humidity: ${humid}%  Dewpoint: ${}, 5. Barometric Pressure: ${baro}F, 6. Wind: ${windDir} ${windSpeed} MPH, 7. Visib: ${visb} mi.  Ceiling: ${}, 8. ${month} Precipitation: ${}


// 			function order1() {
// 				bottomBar.innerHTML = `Conditions at ${curCity}`
// 			}
			
// 		 	function order2() {
// 				bottomBar.innerHTML = `${cond}`
// 			}

// 			function order3() {
// 				bottomBar.innerHTML = `Temp: ${temp}°F`
// 			}

// 			function order4() {
// 				bottomBar.innerHTML = `Humidity: ${humid}%  Dewpoint:`//here would be dewpoint if we had it :(
// 			}

// 			function order5() {
// 				bottomBar.innerHTML = `Barometric Pressure: ${baro}`//Need a function here to see if pressure is falling, dropping, or sustaning.
// 			}

// 			function order6() {
// 				bottomBar.innerHTML = `Wind: ${windDir} ${windSpeed} ${mph}`
// 			}

// 			function order7() {
// 				bottomBar.innerHTML = `Visib: ${visb} mi.  Ceiling:`//Need a data point for ceiling, eventually.
// 			}

// 			function order8() {
// 				bottomBar.innerHTML = `${dt.slice(3, 7)} Precipitation:` //Need a data point for precip, eventually.
// 			}
// 	}

// 	var endSlideShow = setInterval(slideshow, 32000)
// 	setInterval(function() { 
// 		clearInterval(endSlideShow) 
// 		bottomBar.innerHTML = ``
// 		}, 600000)		
// 	}

// };




{/* <div class="setUpBox">
        <div class="location">
            <h3>Enter Zip</h3>
			<input type="text" placeholder="Enter Zip" rel="zipInput">
			<select rel="ctrySel">
				<option value="US">USA</option>
		  	</select>
            <input type="submit" value="Submit" rel="zipSubmit">
        </div>
        <div class="subInfo">
            <h3>Find My Location</h3>
            <input type="submit" value="Use My Location" rel="locationSubmit">
        </div>
        <div class="features">
            <input type="checkbox" rel="musicOn">Music?
        </div>           
    </div> */}




















