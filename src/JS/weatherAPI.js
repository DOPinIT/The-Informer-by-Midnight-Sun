import axios from "axios";

const weatherWidget = document.querySelector(".weather-wrapper");
console.log(weatherWidget);

 function getWeather(e) {
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&appid=fccf2d671c66d0d845cceb32d377da4e`).then(res => console.log(res.json()))
}

getWeather("kyiv")