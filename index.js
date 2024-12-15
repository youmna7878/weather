var searchInput = document.getElementById('searchValue');
var todayDay = document.getElementById('todayDay');
var todayDateNum = document.getElementById('todayDateNum');
var todayDateMon = document.getElementById('todayDateMon');
var todayLocation = document.getElementById('todayLocation');
var todayTemp = document.getElementById('todayTemp');
var todayIcon = document.getElementById('todayIcon');
var todayText = document.getElementById('todayText');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var windDir = document.getElementById('windDir');
var forecastDays = document.getElementsByClassName('forecast-days');
var forecastIcon = document.getElementsByClassName('forecast-Iconn');
var maxTemp = document.getElementsByClassName('max-temp');
var minTemp = document.getElementsByClassName('min-temp');
var forecastText = document.getElementsByClassName('forecast-text');
var searchValue
async function getData(search) {
    var weatherApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bfee6e438ecc4ff5a76164900241112&q=${search}&days=3`);
    var weatherResponse = await weatherApi.json()
    return weatherResponse
}

function displayToday(data) {
    var todayDate = new Date()
    todayDay.innerHTML = todayDate.toLocaleDateString('en-us', { weekday: "long" })
    todayDateMon.innerHTML = todayDate.toLocaleDateString('en-us', { month: "long" })
    todayDateNum.innerHTML = todayDate.getDate()
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayText.innerHTML = data.current.condition.text
    todayIcon.setAttribute("src","https://"+ data.current.condition.icon)
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    windDir.innerHTML = data.current.wind_dir
}

function displayForecast(data) {
    for (var i = 0; i < 2; i++) {
        var forecastDate = new Date(data.forecast.forecastday[i + 1].date)
        forecastDays[i].innerHTML = forecastDate.toLocaleDateString('en-us', { weekday: "long" })
        maxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c + '°C' // i+1 tanee index
        minTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c + '°'
        forecastText[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text
        forecastIcon[i].setAttribute("src", "https://"+data.forecast.forecastday[i + 1].day.condition.icon)
    }
}

async function startPoint(name = 'cairo')                                                                    // default value law el user mb3t4 7aga el value bta3et cairo hya ele htb2a m3roda 
{
    var weatherData = await getData(name)
    if (!weatherData.error) {                                                                             // law el api m4 mrg3 error fe el object bta3o
        displayToday(weatherData)
        displayForecast(weatherData)
    }
}
startPoint()

searchInput.addEventListener('input', function () {
    searchValue = searchInput.value
    startPoint(searchValue)
})











// var date = new Date() // date built-in object , method=> getDate() , toLocaleDateString()
// console.log(date.getDate()); // num of day
// console.log(date.toLocaleDateString('en-us', { weekday: "long" })); // weekday ( "short" , "long" , "narrow")
// console.log(date.toLocaleDateString('en-us', { month: "long" })); // month ( "short" , "long" , "narrow")

