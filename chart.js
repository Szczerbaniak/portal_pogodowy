/** @format */

export function plotChart(xValues, temperatures, windspeeds, windgusts, rain) {
	const chart = new Chart('myChart', {
		type: 'line',
		data: {
			labels: xValues,
			datasets: [
				{
					label: 'temperature (°C)',
					data: temperatures,
					borderColor: 'green',
					borderColor: 'rgb(162, 11, 237)',
					fill: false,
				},
				{
					label: 'windspeed (km/h)',
					type: 'line',
					data: windspeeds,
					borderColor: 'blue',
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1,
				},
				{
					label: 'windgusts (km/h)',
					type: 'line',
					data: windgusts,
					borderColor: 'blue',
					fill: false,
					borderColor: 'rgb(60, 140, 192)',
					tension: 0.1,
				},
				{
					label: 'rain (mm)',
					type: 'bar',
					data: rain,
					background: 'red',
					// fill: false,
					backgroundColor: 'rgb(65, 219, 106)',

					borderWidth: 1,
				},
			],
		},
		options: {
			legend: { display: true },
			scales: {
				xAxes: [
					{
						gridLines: {
							color: 'rgba(0, 0, 0, 0)',
						},
					},
				],
				yAxes: [
					{
						gridLines: {
							color: 'rgba(0, 0, 0, 0)',
						},
					},
				],
			},
			responsive: true,
			maintainAspectRatio: false,
		},
	});
	return chart;
}

