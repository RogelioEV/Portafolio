var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("about", { title: "Sobre Mí", page: "about" });
});

module.exports = router;
