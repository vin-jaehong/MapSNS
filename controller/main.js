
exports.mainView = (req,res)=>
{
    if(!req.user) res.render("main.ejs");
    else res.render("main_user.ejs",{"userName":req.user});
};