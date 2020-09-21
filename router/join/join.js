var express = require("express");
var router = express.Router();
var controller = require("../../controller/join.js");




router.get("/",controller.joinView);

router.post("/",controller.joinExe);



module.exports = router;
