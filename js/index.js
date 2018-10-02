//NEW API! Weather.gov is far better.
//https://api.weather.gov


//https://api.weather.gov/stations/KLAS/observations////Current conditions as McCarrin Airport Las Vegas




//https://api.weather.gov/gridpoints/VEF/122,97/stations Brings in stations in a 2.5k area of your coordinates.




//First, browser will take your coordinates from your location and feed them into this api:
//https://api.weather.gov/points/<lat, lon>



window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};