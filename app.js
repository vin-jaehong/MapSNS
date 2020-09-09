// 모듈 가져오기
var express = require("express");
var mariaDB = require("mariadb");

// express 모듈 app 변수에 객체화 
var app = express();
// 포트

// DB와 연동 해주는 모듈 생성
var connect = mariaDB.createConnection({
    host        : "localhost",
    port        : "3306",
    user        : "root",
    password    : "ki040504",
    database    : "location_based_sns"
});

app.get("/", function(req,res)
{
    
});

// DB 연동
app.listen(3000,function()
{
    console.log("connect server...! port : 3000");
});






