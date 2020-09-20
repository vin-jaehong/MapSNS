var express = require("express");
var router = express.Router();
var login = require("./login/login.js");
var join = require("./join/join.js");
var logout = require("./logout/logout.js");

router.use("/login",login);
router.use("/join",join);
router.use("/logout",logout);

router.get("/",(req,res)=>
{
    if(!req.user) res.render("main.ejs");
    else res.render("main_user.ejs",{"userName":req.user});
});

module.exports = router;

