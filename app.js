var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var router = require("./router/index.js");

app.listen(3000,(req,res)=>
{
    console.log("server connected...!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");

app.use(router);



