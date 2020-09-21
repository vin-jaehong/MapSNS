var express = require("express");
var router = express.Router();
var controller = require("../../controller/login.js");

router.get("/",controller.loginView);
router.post("/",controller.loginExe);

module.exports = router;

