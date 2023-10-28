/** @format */

export let latitude = 0;
export let longitude = 0;

const options = {
	enableHighAccuracy: false,
	timeout: 10000,
	maximumAge: 0,
};

function success(pos) {
	latitude = pos.coords.latitude;
	longitude = pos.coords.longitude;

	console.log(latitude, longitude);
}

function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

export function getLocation() {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	} else {
		console.error('Geolocation is not supported by this browser.');
	}
	console.log('t');
}

function getLotationFromIp() {

}


