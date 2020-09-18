var express = require("express");
var router = express.Router();
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var mariaDB = require("mariadb");
var moment = require("moment");


var pool = mariaDB.createPool({
    host    : "localhost",
    user    : "root",
    password : "ki040504",
    port : 3306,
    database : "location_based_sns"
})
pool.getConnection();



router.get("/",(req,res)=>
{
    res.render("login.ejs");
});

passport.serializeUser((user,done)=>
{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>
{
    done(null,id);
});

passport.use("local-login", new localStrategy(
    {
        usernameField : "id",
        passwordField : "pw",
        passReqToCallback : true
    },
    (req,id,pw,done)=>
    {
        pool.query(`select ID,PW from user where ID = "${id}";`).then((rows)=>
        {
            // ID 조회 후 Password 조회
            if(!rows.length) done(null,false,{message:"ID를 찾을 수 없습니다."});
                // ID 조회 실패
             
            if(rows[0].PW != pw ) done(null,false,{message:"Passwrod 가 불일치 합니다."});
                // PW 조회 실패
                
            // Login 성공
            const userLastLoginIp = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
            const userLastLoginDate = moment().format("YYYY-MM-DD HH:mm:ss");

            //FIRST_LOGIN_DATE가 당일에 이미 등록이 되있는 경우 갱신을 하지 않기 위한 코드
            pool.query(`select FIRST_LOGIN_DATE from user where ID ="${id}";`).then((rows)=>
            {                   
                const takeDbData = moment(rows[0].FIRST_LOGIN_DATE).format("YYYY-MM-DD");
                    // db에 저장되어 있는 첫번째 로그인 데이터를 (일) 까지만 가져옴.
                const nowDayDate = moment().format("YYYY-MM-DD");
                    // 현재 DATE를 (일) 까지만 가져옴
                var query;
                if(takeDbData!=nowDayDate)
                {
                    const userFirstLoginDate = moment().format("YYYY-MM-DD HH:mm:ss");

                    query = `update user set FIRST_LOGIN_DATE ="${userFirstLoginDate}" where ID = "${id}";`;
                    pool.query(query);
                }
                query = `update user set LAST_LOGIN_IP = "${userLastLoginIp}", LAST_LOGIN_DATE="${userLastLoginDate}" where ID ="${id}";`;
                pool.query(query).then(()=>
                {
                    done(null,{"id":id});
                }).catch((err)=>{done(err);});
            
            }).catch((err)=>{done(err);})

        }).catch((err)=>{done(err);});
    }
));


router.post("/",(req,res,next)=>
{
    passport.authenticate("local-login", (err,user,info)=>
    {
        if(err) res.status(500).json(err);
        if(!user) return res.json(info.message);

        req.logIn(user, (err)=>
        {
            if(err) return next(err);
            res.json(user);
        });
    })(req,res,next)
});

module.exports = router;
