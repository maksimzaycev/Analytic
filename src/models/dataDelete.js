function deleteData(url, id) {
	return new Promise(function (resolve, reject) {

		var request = new XMLHttpRequest();
		var userUrl = url + '/' + id;
		
		console.log('Удаление элемента');
		console.log(userUrl);

		request.open("DELETE", userUrl, true);
		request.onload = function () {
				if (request.readyState == 4 && request.status == "200") {
					resolve(request.response);
				} else {
					reject('reject ' + request.status);
				}
		}
		request.addEventListener('error', function() {
			reject('network error');
		});
		request.send(null);
	});
}

module.exports = deleteData;

