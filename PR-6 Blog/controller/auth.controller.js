exports.loginpage = async (req, res) =>{
    try {
        return res.render("loginpage")
    } catch (error) {
        console.log(err);        
        return res.redirect("/");
    }
}
exports.dashboardpage = async (req, res) =>{
    try {
        return res.render("dashboard")
    } catch (error) {
        console.log(err);        
        return res.redirect("/");
    }
}