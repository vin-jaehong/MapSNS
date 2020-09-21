var express = require("express");
var router = express.Router();
var controller = require("../../controller/logout.js");

router.get("/",controller.logoutExe); 

module.exports = router;