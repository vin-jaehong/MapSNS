var express = require("express");
var router = express.Router();
var login = require("./login/login.js");
var join = require("./join/join.js");
var logout = require("./logout/logout.js");
var controller = require("../controller/main.js");

router.use("/login",login);
router.use("/join",join);
router.use("/logout",logout);

router.get("/",controller.mainView);

module.exports = router;

