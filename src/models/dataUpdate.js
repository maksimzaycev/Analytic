function UpdateData(url, data, id) {
	return new Promise(function (resolve, reject) {
		var json = JSON.stringify(data);
		var request = new XMLHttpRequest();
		var userUrl = url + '/' + id;

		request.open("PUT", userUrl, true);
		request.setRequestHeader('Content-type','application/json; charset=utf-8');
		request.onload = function () {
			if (request.readyState === 4 && request.status === 200) {
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

module.exports = UpdateData;