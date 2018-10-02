function getWeather(c) { ///Eventually, c will be data passed to this function for any city in cityList so user can switch cities, for now, just Las Vegas, NV
	
	var currentCondAPI = ////Gets current conditions 
		fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
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

  	var forecastAPI = //Gets 5 day forecast
  		fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+apiId)
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