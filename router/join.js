var express = require("express");
var router = express.Router();
var requestIp = require("request-ip");

router.get("/",(req,res)=>
{
    res.render("join.ejs");
});
router.post("/",(req,res)=>
{
    var user = req.body;
    /*
    user.name
    user.gender
    user.id
    user.pw
    user.email
    user.tel
    */
   const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;

    res.send(ip);

    
});

module.exports = router;
