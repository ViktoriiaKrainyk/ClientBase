var express = require('express'),
	api = express.Router(),
	fs = require('fs');

/* GET home page. */
api.get('/', function(req, res) {
	res.json([1, 5, 9, 'Vasja']);
});

api.get('/get-all-users', function(req, res){
	fs.readFile('./bd_sample/data.json', function(err, data){
		if (err) {
			console.log(err);
		} else {
			var get_users = JSON.parse(data.toString());
			setTimeout(function(){
				res.json(get_users);
			}, 1000);
		}
	});
});

api.post('/add-user', function(req, res) {
	console.log(req);
	fs.readFile('./bd_sample/data.json', function(err, data) {
		var file_data = JSON.parse(data.toString());
		file_data.push({
			about: req.body.user_story,
			email: req.body.user_email,
			name: req.body.user_name,
			picture: req.body.user_picture,
			_id: Math.random().toString(36).substring(2),
		});
		fs.writeFile('./bd_sample/data.json', JSON.stringify(file_data, null, 2), function(err) {
			res.json(err);
		});

	});
});

api.get('/del/:id', function (req, res) {
	fs.readFile('./bd_sample/data.json', function(err, data){
		var file_data = JSON.parse(data.toString());
		for (var i = 0; i < file_data.length; i++) {
			if (file_data[i]._id === req.params.id) {
				file_data.splice(i, 1);
			}
		};
		fs.writeFile('./bd_sample/data.json', JSON.stringify(file_data, null, 2), function(err) {
			// res.json(err);
		});
	});
res.redirect('/');
});

module.exports = api;
