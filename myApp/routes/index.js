var express = require('express'),
	router = express.Router(),
	fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Client Data' });
});

module.exports = router;
