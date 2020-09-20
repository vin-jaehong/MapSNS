var express = require("express");
var router = express.Router();
var mariaDB = require("mariadb");
var moment = require("moment");

var pool = mariaDB.createPool({
    host    : "localhost",
    user    : "root",
    password: "ki040504",
    port    : 3306,
    database: "location_based_sns"
});
pool.getConnection();

router.get("/",(req,res)=>
{
    req.logout();
    res.redirect("/");
}); 

module.exports = router;