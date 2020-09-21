var mariaDB = require("mariadb");
var moment = require("moment");
const passport = require("passport");
const { query } = require("express");
var localStrategy = require("passport-local").Strategy;


var pool = mariaDB.createPool({
    host    : "localhost",
    user    : "root",
    password: "ki040504",
    port    : 3306,
    database: "location_based_sns"
});
pool.getConnection();



exports.joinView = (req,res)=>
{
    if(req.user) res.redirect("/");
    else res.render("join.ejs");
};

passport.serializeUser((user,done)=>
{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>
{
    done(null,id);
});
passport.use("local-join", new localStrategy(
    {
        usernameField : "id",
        passwordField : "pw",
        passReqToCallback : true
    },
    (req,id,pw,done)=>
    {
        pool.query(`select * from user where ID ="${id}";`).then((rows)=>
        {
            // 입력한 ID가 중복되는 경우
            if(rows.length)
            {
                return done(null,false,{message:"ID가 중복됩니다"});
            }
            // 입력한 ID가 중복되지 않을 경우
            const user = req.body;
            const userLastLoginIp = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
            const userJoinDate = moment().format("YYYY-MM-DD");
            const userFirstLoginDate = moment().format("YYYY-MM-DD HH:mm:ss");
            const userLastLoginDate = moment().format("YYYY-MM-DD HH:mm:ss");
            
            const query = `insert into user(NAME,GENDER,ID,PW,EMAIL,TEL,LAST_LOGIN_IP,JOIN_DATE,FIRST_LOGIN_DATE,LAST_LOGIN_DATE,AGREEMENT_01,AGREEMENT_02)
            VALUES("${user.name}","${user.gender}","${user.id}","${user.pw}","${user.email}","${user.tel}",
            "${userLastLoginIp}","${userJoinDate}","${userFirstLoginDate}","${userLastLoginDate}","${user.agreement_01}","${user.agreement_02}");
            `;
            
            pool.query(query).then((rows)=>
            {
                // 쿼리문 실행 완료 후
                return done(null,{"id":id});

            }).catch((err)=>{done(err);});
            

        }).catch((err)=>{done(err);})
    }
));


exports.joinExe = (req,res,next)=>
{
    passport.authenticate("local-join", (err,user,info)=>
    {
        if(err) return res.status(500).json(err);
        if(!user) return res.json(info.message);
        
        req.login(user, (err)=>
        {
            if(err) return next(err);
            
            res.json(user);
        });
    })(req,res,next);
};


