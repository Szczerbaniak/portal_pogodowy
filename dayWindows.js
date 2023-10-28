/** @format */
const days = [];

export function createDayWindows(
	weekWeather,
	sevenDaysInfo,
	wmoToImg,
	weatherBox
) {
	const template = sevenDaysInfo.querySelector('.dayTmp');

	for (let i = 0; i < weekWeather.time.length; i++) {
		const tempDay = template.content.querySelector('.day').cloneNode(true);
		const dayName = tempDay.querySelector('.dayName');
		const howRainy = tempDay.querySelector('.howRainy');
		const windDirectionAndSpeed = tempDay.querySelector(
			'.windDirectionAndSpeed'
		);
		const windSpeed = windDirectionAndSpeed.querySelector('.windSpeed');
		const windDirection = windDirectionAndSpeed.querySelector('.windDirection');
		const minMaxTemp = tempDay.querySelector('.minMaxTemp');

		let img = document.createElement('img');
		img.src = wmoToImg[weekWeather.weathercode[i]].day.image;
		howRainy.appendChild(img);

		dayName.textContent = weekWeather.time[i];
		windSpeed.textContent = weekWeather.windspeed_10m_max[i] + 'km/h';
		windDirection.style.transform = `rotate(${
			weekWeather.winddirection_10m_dominant[i] - 90
		}deg) scale(0.2)`;

		dayName.textContent = weekWeather.time[i];
		minMaxTemp.textContent = `${weekWeather.temperature_2m_min[i]} - ${weekWeather.temperature_2m_max[i]} °C`;

		days.push(tempDay);
		sevenDaysInfo.appendChild(tempDay);
		resize();
	}
}

days.forEach((day, i) => {
	day.addEventListener('click', async () => {
		const selectedDay = await getWeatherForDay(latitude, longitude, i + 1);
		chart.destroy();
		chart = plotChart(
			selectedDay.time,
			selectedDay.temperature_2m,
			selectedDay.windspeed_10m,
			selectedDay.windgusts_10m,
			selectedDay.rain
		);
		console.log(selectedDay);
	});
});

export function resize() {
	const weatherBox = document.querySelector('.weather');

	let weatherWidth = weatherBox.clientWidth;
	// console.log(weatherWidth);

	if (weatherWidth <= 780) {
		return;
	}
	let wantedDayWidth = weatherWidth / 8;
	let currentDayWidth = days[0].clientWidth;
	let scale = wantedDayWidth / currentDayWidth;

	days.forEach((day) => {
		day.style.transform = `scale(${scale})`;
	});
}
