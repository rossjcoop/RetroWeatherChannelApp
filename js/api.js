function getWeatherCord() { ///Pulls in data via cordinates provided by the browser
	
	let currentCondAPI = ////Gets current conditions 
		fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
  			.then(response => {
	  			if(response.status !== 200) {
	        		console.log("Current condition API: ", response.status)
	        		return	      	
	      		} else {
	      			return response.json()
	      		}	
  			});	
  		

  	let localObsAPI = ///Gets 7 weather stations current conditions based on lat and lon of the current conditions city
  		fetch("http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units=imperial&APPID="+apiId)
			.then(response => {
  				if(response.status !== 200) {
        			console.log("Local weather stations API: ", response.status)
        			return
      			} else {
		      		return response.json()		  		
		  		}
  			});

  	let forecastAPI = //Gets 5 day forecast
  		fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
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
		  main(combinedData) //Send it to my slideshow
  	})
};


function getWeatherZip() { ///Or pulls weather data via zip code and country
	let combinedData = {"currentCondAPI": {}, "localObsAPI": {}, "forecastAPI": {}};
	
	// let currentCondAPI = ////Gets current conditions 
		fetch("http://api.openweathermap.org/data/2.5/weather?zip="+zip+","+ctry+"&units=imperial&APPID="+apiId)
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
							fetch("http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&cnt=7&units=imperial&APPID="+apiId)
								.then(response => {
									if(response.status !== 200) {
										console.log("Local weather stations API: ", response.status)
										return
									} else {
										return response.json()
									}		  		
								});
			  
						let forecastAPI = //Gets 5 day forecast
							fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
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
							main(combinedData) //Send it to my slideshow
						})
					});
		
				}	  
  			})	  
};