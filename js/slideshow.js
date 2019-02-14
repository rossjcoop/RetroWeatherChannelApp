function main(weatherData) {
	

	if(music == true) {
		musicPlayer.src = track
		musicPlayer.autoplay = "true"
		musicPlayer.loop = "true"
		musicPlayer.load()
	}
	
	//Current conditions weather data////////////////////////////////////////////////////
	// let temp = Math.round(weatherData.currentCondAPI.main.temp)
	// let cond = weatherData.currentCondAPI.weather[0].description 
	// let icon = weatherData.currentCondAPI.weather[0].icon
	// let windDir = getWindDirection(weatherData.currentCondAPI.wind.deg)
	// let windSpeed = returnCalm(Math.round(weatherData.currentCondAPI.wind.speed), windDir)
	// let windGust = returnGust(weatherData.currentCondAPI.wind.gust)
	// let curCity = weatherData.currentCondAPI.name
	// let humid = weatherData.currentCondAPI.main.humidity
	// let baro = convertInHg(weatherData.currentCondAPI.main.pressure)
	// let visb = convertMeters(weatherData.currentCondAPI.visibility)
	// let dt = new Date(weatherData.currentCondAPI.dt * 1000).toDateString()
	////////////////////////////////////////////////////////////////////////////////////
	

	 ///////////////Just had a thought, to store the barometric pressure in local storage, this will reference whether pressure is going up or down
	slideshow2()
	footer()


	function slideshow2() {

		page1()
		setTimeout(page2, 20000)
		setTimeout(page3, 40000)


		function page1() { 
			container.classList.remove("forecast")			
			desktop.style.backgroundColor = "rgb(36, 43, 90)";
			desktop.style.boxShadow = "inset 0 0 75px rgb(83, 90, 125)";
			containerClmns.style.display = "none";
			headline.innerHTML = `
				<div class="headlineTop">Current</div>
				<div class="headlineBottom">Conditions</div>`
			container.innerHTML = `
				<div class = "page1Box">
					<div class = "mainInfo">
						<div class = "tempBox">
							<h1 id = "temp">${ccTemp}</h1><h1>°</h1>
						</div>
						<h2 id = "cond">${ccCond}</h2>
						<div id = "ccGif"><img class="gif" src="./Images/CurrentConditions/${ccIcon}.gif"></div>
						<h3 id = "wind">Wind: ${ccWindDir} ${ccWindSpeed}</h3>
						<h3 id = "gust">${ccwindGust}</h3>
					</div>
					<div class = "subInfo">
						<h3 id = "cityName">${city}</h3>
						<h3 id = "humidity">Humidity: ${ccHumid}%</h3>
						<h3>Dewpoint: No Data</h3>
						<h3>Ceiling: No Data</h3>
						<h3 id = "visibility">Visibility: ${ccVisb} mi</h3>
						<h3 id = "pressure">Pressure: ${ccBaro}</h3>
					</div>
				</div>`
		};


		function page2(){
			containerClmns.style.display ="inline";
			headline.innerHTML = `<div class="headlineTop">Latest Observations</div>`
			container.innerHTML = ''
			containerClmns.innerHTML = `
				<div class = "columnRow">
					<div class = "cityClmn"></div>
					<div class = "cityTempClmn">${unitDisplay}</div>
					<div class = "cityWeatherClmn">WEATHER</div>
					<div class = "cityWindClmn">WIND</div>
				</div>
			`	
			lo.forEach(function(item) { 		
				let resultBlock = ''
				// let wd = getWindDirection(item.wind.deg)
				// let ws = returnCalm(Math.round(item.wind.speed), wd)
				
				resultBlock = `		
				<div class = "cityRow">
					<div class = "city">${item.name}</div>
					<div class = "cityTemp">${item.temp}</div>
					<div class = "cityWeather">${item.weather}</div>
					<div class = "cityWind">${item.wind}</div>
				</div>
				
				`
				container.innerHTML += resultBlock

				})

		};


		function page3(){
			container.innerHTML = ``
			container.classList.add("forecast")
			desktop.style.backgroundColor = "transparent";
			desktop.style.boxShadow = "none"
			containerClmns.style.display ="none";
			headline.innerHTML = `
				<div class="headlineTop" style="color: white;">${city}</div>
				<div class="headlineBottom">Extended Forecast</div>
				`		
			containerClmns.innerHTML = ``
			// let hiLo = data.list.filter(threeDay)
			// // console.log("hiLo", hiLo)
			// let dayCond = data.list.filter(dayForecast)
			// // console.log(dayCond)

			// let day1 = dayofWeek(new Date(hiLo[0].dt * 1000).getDay())
			// let day2 = dayofWeek(new Date(hiLo[2].dt * 1000).getDay())
			// let day3 = dayofWeek(new Date(hiLo[4].dt * 1000).getDay())

			ef.forEach(function(item) {
				let resultBlock = ''

				resultBlock = `
					<div class = "days">
						<div class = "day">${item.day}</div>
						<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${item.icon}.gif"></div>
						<div class = "dayCond">${item.condition}</div>
						<div class = "tempsBox">
							<div class = "temps">
								<div class = "tempLo">Lo</div>
								<div class = "dayTemp">${item.low}</div>
							</div>
							<div class = "temps">
								<div class = "tempHi">Hi</div>
								<div class = "dayTemp">${item.high}</div>
							</div>
						</div>
					</div>`

				container.innerHTML += resultBlock
			})

		
			// container.innerHTML = `
			// 	<div class = "forecast">
			// 		<div class = "days">
			// 			<div class = "day">${day1.substr(0, 3).toUpperCase()}</div>
			// 			<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[0].weather[0].icon}.gif"></div>
			// 			<div class = "dayCond">${dayCond[0].weather[0].description}</div>
			// 			<div class = "tempsBox">
			// 				<div class = "temps">
			// 					<div class = "tempLo">Lo</div>
			// 					<div class = "dayTemp">${Math.round(hiLo[0].main.temp)}</div>
			// 				</div>
			// 				<div class = "temps">
			// 					<div class = "tempHi">Hi</div>
			// 					<div class = "dayTemp">${Math.round(hiLo[1].main.temp)}</div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 		<div class = "days">
			// 			<div class = "day">${day2.substr(0, 3).toUpperCase()}</div>
			// 			<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[1].weather[0].icon}.gif"></div>
			// 			<div class = "dayCond">${dayCond[1].weather[0].description}</div>
			// 			<div class = "tempsBox">
			// 				<div class = "temps">
			// 					<div class = "tempLo">Lo</div>
			// 					<div class = "dayTemp">${Math.round(hiLo[2].main.temp)}</div>
			// 				</div>
			// 				<div class = "temps">
			// 					<div class = "tempHi">Hi</div>
			// 					<div class = "dayTemp">${Math.round(hiLo[3].main.temp)}</div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 		<div class = "days">
			// 			<div class = "day">${day3.substr(0, 3).toUpperCase()}</div>
			// 			<div class = "dayGif"><img class="gifSmall" src="./Images/CurrentConditions/${dayCond[2].weather[0].icon}.gif"></div>
			// 			<div class = "dayCond">${dayCond[2].weather[0].description}</div>
			// 			<div class = "tempsBox">
			// 				<div class = "temps">
			// 					<div class = "tempLo">Lo</div>
			// 					<div class = "dayTemp">${Math.round(hiLo[4].main.temp)}</div>
			// 				</div>
			// 				<div class = "temps">
			// 					<div class = "tempHi">Hi</div>
			// 					<div class = "dayTemp">${Math.round(hiLo[5].main.temp)}</div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	</div>
			// 	`
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
		let mph = returnMPH(ccWindSpeed)
		
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
				bottomBar.innerHTML = `Conditions at ${city}`
			}
			
		 	function order2() {
				bottomBar.innerHTML = `${ccCond}`
			}

			function order3() {
				bottomBar.innerHTML = `Temp: ${ccTemp}${unitDisplay}`
			}

			function order4() {
				bottomBar.innerHTML = `Humidity: ${ccHumid}%  Dewpoint:`//here would be dewpoint if we had it :(
			}

			function order5() {
				bottomBar.innerHTML = `Barometric Pressure: ${ccBaro}`//Need a function here to see if pressure is falling, dropping, or sustaning.
			}

			function order6() {
				bottomBar.innerHTML = `Wind: ${ccWindDir} ${ccWindSpeed} ${mph}`
			}

			function order7() {
				bottomBar.innerHTML = `Visib: ${ccVisb} mi.  Ceiling: No Data`//Need a data point for ceiling, eventually.
			}

			function order8() {
				bottomBar.innerHTML = `${ccDt.slice(3, 7)} Precipitation: No Data` //Need a data point for precip, eventually.
			}
	}

	var endSlideShow = setInterval(slideshow, 32000)
	setInterval(function() { 
		clearInterval(endSlideShow) 
		bottomBar.innerHTML = ``
		}, 600000)		
	}

};