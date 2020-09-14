var express = require("express");
var router = express.Router();
var login = require("./login.js");
var join = require("./join.js");


router.use("/login",login);
router.use("/join",join);

router.get("/",(req,res)=>
{
    res.render("main.ejs");
});

module.exports = router;

