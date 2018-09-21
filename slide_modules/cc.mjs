


//This is the Current Condtion slide, usually the first one that displays at the beginning of the Local Forecast

function page1() { 			
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
                    <h1 id = "temp">${temp}</h1><h1>°</h1>
                </div>
                <h2 id = "cond">${cond}</h2>
                <div id = "ccGif"><img class="gif" src="./Images/CurrentConditions/${icon}.gif"></div>
                <h3 id = "wind">Wind: ${windDir} ${windSpeed}</h3>
                <h3 id = "gust">${windGust}</h3>
            </div>
            <div class = "subInfo">
                <h3 id = "cityName">${curCity}</h3>
                <h3 id = "humidity">Humidity: ${humid}%</h3>
                <h3>Dewpoint: </h3>
                <h3>Ceiling: </h3>
                <h3 id = "visibility">Visibility: ${visb} mi</h3>
                <h3 id = "pressure">Pressure: ${baro}</h3>
                <h3>Heat Index: </h3>
            </div>
        </div>`
};

module.exports = page1