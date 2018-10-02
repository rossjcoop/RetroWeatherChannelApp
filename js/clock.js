
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