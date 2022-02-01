var express = require('express');
var router = express.Router();
var debug = require('debug')('myapp:user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  debug('debug desde users')
  res.send('respond with a resource');
});

module.exports = router;
