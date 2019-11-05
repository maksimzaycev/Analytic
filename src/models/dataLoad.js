function LoadData(url) {
	return new Promise(function (resolve, reject) {
		console.log('Загрузка всех элементов из:');
		console.log(url);
		let request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.addEventListener('load', function() {
			if (request.status < 400) {
				resolve(request.response);
			} else {
				reject('reject ' + request.status);
			}
		});
		request.addEventListener('error', function() {
			reject('network error');
		});
		request.send();
	});
}

export default LoadData;