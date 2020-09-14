var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var router = require("./router/index.js");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var session = require("express-session");
var flash = require("connect-flash");


app.listen(3000,"0.0.0.0",(req,res)=>
{
    console.log("server connected...!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("./public"));
// passport 
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true    
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("view engine","ejs");
app.set("views","./views");

app.use(router);



