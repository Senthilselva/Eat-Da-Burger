/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var cat = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	cat.all(function (data) {
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	cat.create(['burger_name', 'devoured'], [req.body.name, req.body.sleepy], function () {
		res.redirect('/burgers');
	});
});

router.put('/cats/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	cat.update({ sleepy: req.body.sleepy }, condition, function () {
		res.redirect('/cats');
	});
});

router.delete('/cats/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	cat.delete(condition, function () {
		res.redirect('/cats');
	});
});

module.exports = router;
