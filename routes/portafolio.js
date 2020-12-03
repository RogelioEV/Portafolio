var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("portafolio", {
    title: "Portafolio",
    page: "portafolio",
    categories: [
      {
        name: "3D",
        img: "https://storage.googleapis.com/portafolio-rev/3dWork.png"
      },
      {
        name: "Fotografía",
        img: "https://storage.googleapis.com/portafolio-rev/fotografia.png"
      },
      {
        name: "Code",
        img: "https://storage.googleapis.com/portafolio-rev/code.png"
      }
    ]
  });
});
router.get("/3D", (req, res, next) => {
  res.render("portafolioSection", {
    title: "3D"
  });
});

module.exports = router;
