
exports.logoutExe = (req,res)=>
{
    req.logout();
    res.redirect("/");
}; 
