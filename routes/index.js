var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var authenticated = req.oidc.isAuthenticated() ? true : false;
  if (authenticated){
    var admin = req.oidc.user.fs_roles.includes("admin") ? true : false;
  }
  res.render('index', { title: "Home | Forager's Scrapbook", authenticated, home: true, profile: false, admin });
});

module.exports = router;
