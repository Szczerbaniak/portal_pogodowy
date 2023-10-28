/** @format */

export async function getWeatherForDay(latitude, longitude, day) {
	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,windspeed_10m,windgusts_10m&timezone=auto&forecast_days=${day}&models=best_match`
	);

	const weather = await response.json();


	for (const property in weather.hourly) {
		weather.hourly[property] = weather.hourly[property].slice(-24);
	}

	weather.hourly.time = weather.hourly.time.map((element) => {
		element = element.slice(-5);
		return element;
	});

	return weather.hourly;
}

export async function getWeatherForWeek(latitude, longitude) {
	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunset,sunrise,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&models=best_match`
	);

	const weather = await response.json();

	weather.daily.time = weather.daily.time.map((element) => {
		element = getDayName(new Date(element), 'en-US');
		return element;
	});

	return weather.daily;
}
function getDayName(date, locale) {
	return date.toLocaleDateString(locale, { weekday: 'long' });
}
