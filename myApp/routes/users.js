var express = require('express');
var users = express.Router(),
	fs = require('fs');

/* GET users listing. */
users.get('/', function(req, res, next) {
  res.render('users');
});

users.param('user_id', function(req, res, next, value) {
	req.id = value;
	next();
});

users.get('/single-user/:user_id', function(req, res) {
	fs.readFile('./bd_sample/data.json', function(err, data){
		if (err) {
			console.log(err);
		} else {
			var get_users = JSON.parse(data.toString());
			var user = get_users.filter(function(curr, index, array) { //map или filter, если в get_users есть value, то
					return curr._id == req.id;
				});
			user = user[0];
			console.log(user);
			res.render('single-user', {data: user});

		};
	});
});



// users.param('user_id', function(req, res, next, value) {
//     req.id = value;
//     next();
// });

// users.get('/single-user/:user_id', function(req, res) {
//     fs.readFile('./bd_sample/data.json', function(err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             var get_users = JSON.parse(data.toString());
//             var user = get_users.reduce(function(init, next, index, array) {
//                 if (next._id == req.id) {
//                     init = next;
//                 };
//                 return init;
//             }, []);
//             console.log(user);
//             res.render('single-user', {data: user});
//         };
//     });
// });
module.exports = users;
