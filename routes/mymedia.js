var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

/* GET home page. */
router.get('/', requiresAuth(), (req, res) => {
  var authenticated = req.oidc.isAuthenticated() ? true : false;
  res.render('mymedia', { title: "My Media | Forager's Scrapbook", authenticated, profile: true, home: false });
});

module.exports = router;
