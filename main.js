const api = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=e8560a1109f936430203f88c4e09f8f1"//units=imperial //make sure it comes back in Fahrenheit
import cityList from "./Files/cityList.json"



function findCity(city) {

return cityList.filter(item => item.name == city)

}

console.log(cityList)