/** @format */

import { getWeatherForDay, getWeatherForWeek } from './weatherInfo.js';
import { getLocation, latitude, longitude } from './location.js';
import { plotChart } from './chart.js';
import { createDayWindows, resize } from './dayWindows.js';

document.addEventListener('load', () => {
	getLocation();
});

const wmoToImg = await fetch('./wmoToImg.json')
	.then((response) => response.json())
	.then((json) => {
		return json;
	});

const weather = document.querySelector('.weather');
const sevenDaysInfo = weather.querySelector('.sevenDaysInfo');

let dayNum = 1;
getLocation();

const selectedDayWeather = await getWeatherForDay(latitude, longitude, dayNum);

let chart = plotChart(
	selectedDayWeather.time,
	selectedDayWeather.temperature_2m,
	selectedDayWeather.windspeed_10m,
	selectedDayWeather.windgusts_10m,
	selectedDayWeather.rain
);

let weekWeather = await getWeatherForWeek(latitude, longitude);

createDayWindows(weekWeather, sevenDaysInfo, wmoToImg, weather);
resize();

window.addEventListener('resize', resize);

text();

async function text() {
	const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
	console.log(response);
	// let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
	// let ip = data.match(ipRegex)[0];
	// console.log('ip' + ip);
}
function getIPFromAmazon() {
	fetch('https://checkip.amazonaws.com/')
		.then((res) => res.text())
		.then((data) => console.log(data));
}

getIPFromAmazon();
