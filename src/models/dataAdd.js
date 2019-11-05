function AddData(url, data) {
	return new Promise(function (resolve, reject) {

		console.log('Добавление элемента в:');
		console.log(url);

		var json = JSON.stringify(data);
		var request = new XMLHttpRequest();

		request.open("POST", url, true);
		request.setRequestHeader('Content-type','application/json; charset=utf-8');
		request.onload = function () {
			if (request.readyState == 4 && request.status == "201") {
				resolve(request.response);
			} else {
				reject('reject ' + request.status);
			}
		}
		request.addEventListener('error', function() {
			reject('network error');
		});
		request.send(json);

	});
}

module.exports = AddData;