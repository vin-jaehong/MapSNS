var express = require("express");
var router = express.Router();

router.get("/",(req,res)=>
{
    res.render("login.ejs");
});
router.post("/",(req,res)=>
{
    res.send("로그인");
});

module.exports = router;
