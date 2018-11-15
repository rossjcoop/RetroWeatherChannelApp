const apiId = "e8560a1109f936430203f88c4e09f8f1"; //My api id for openweathermap.org

const headline = document.getElementById("headline");
const timestamp = document.getElementById("time");
const datestamp = document.getElementById("date");
const bottomBar = document.getElementById("bottomBar");
const containerClmns = document.getElementById("containerClmns");
const container = document.getElementById("screen");
const desktop = document.getElementById("container");
const headlineTop = document.getElementById("headlineTop");
const headlineBottom = document.getElementById("headlineBottom");
const musicPlayer = document.querySelector(".musicPlayer");


///Location variables
var lat;
var lon;
var city;
var zip;
var ctry;
var music;


////Current Weather variables
var ccTemp; //current temperature of your city	
var ccCond; //current weather conditions of your city
var ccIcon; //current condition weather icon to display
var ccWindDir; //current wind direction of your city
var ccWindSpeed; //current wind speed of your city
var ccWindGust; //current wind gust(if any) of your city	
var ccHumid;//current humidity of your city
var ccBaro;//current barometer of your city
var ccVisb;//current visibility of your city
var ccDt;//date and time of weather report taken


var lo = [];//Local observations for 7 areas

var ef = [];//3 day forecast

function noData(data) { ///Will display if no data reports, or if error.
	if(data == undefined) {
		return "No Data"
	}
}



// setInterval(getWeather, 600000)
// setInterval(function() {
// 	clearInterval(getWeather)
// 	mainBox.innerHTML = ``
// 	bottomBar.innerHTML = ``
// 	}, 50000)//a little note, I had to have this function run in line with the slideshow function intervals in order to not have alignment issues.

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
	} else if(word.startsWith("scattered")) {
		return "Sct'd" + "" + word.substr(9, wordLength)
	} else {
		return word
	}

}


// function threeDay(item) {
// 	let now = new Date().getDay()
// 	// console.log(now)
// 	let itemHour = new Date(item.dt * 1000).getHours()
// 	let itemDay = new Date(item.dt * 1000).getDay()
// 	// console.log(itemDay)
// 	// console.log(itemHour)
// 	if(itemHour == 4 && itemDay !== now || itemHour == 16 && itemDay !== now) { ///Keep in mind, dt in the data is based on GMT +7 hours
// 		return true;
// 	} else {	
// 	return false;
// 	}	
// }

// function dayForecast(item) {
// 	let now = new Date().getDay()
// 	let itemHour = new Date(item.dt * 1000).getHours()
// 	let itemDay = new Date(item.dt * 1000).getDay()
// 	if(itemHour == 13 && itemDay !== now) { ///Keep in mind, dt in the data is based on GMT +7 hours
// 		return true;
// 	} else {
// 	return false;
// 	}	
// }

//Did time change affect my function's here?



function dayofWeek(d) {
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	return days[d]
}


const conditionCodes = [
	{
		id: 200,
		condition: "Thunderstorm",
		shortCond: "T-Storm",
	},
	{	id: 201,
		condition: "Thunderstorm",
		shortCond: "T-Storm",
	},
	{
		id: 202,
		condition: "Thunderstorm",
		shortCond: "T-Storm",
	},
	{
		id: 210,
		condition: "Thunderstorm",
		shortCond: "T-Storm",
	},
	{
		id: 211,
		condition: "Thunderstorm",
		shortCond: "T-Storm",
	}
]





function formatWind(speed, dir) {
	let direction = getWindDirection(dir)
	let velocity = returnCalm(Math.round(speed), direction)

	return direction + velocity
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



function page1Styles() {

}


function page2Styles() {

}


function page3Styles() {
	desktop.style.backgroundColor = "transparent";
	desktop.style.boxShadow = "none"
	containerClmns.style.display ="none";
	container.style.width = "940px";
	container.style.height = "578px";
	container.style.display = "flex";
	container.style.justifyContent = "space-between";
	container.style.fontSize = "50px";
	container.style.paddingTop = "18px";
	container.style.margin = "0 auto";
}





