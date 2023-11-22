var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var authenticated = req.oidc.isAuthenticated() ? true : false;
  res.render('index', { title: "Home | Forager's Scrapbook", authenticated, home: true, profile: false });
});

module.exports = router;
