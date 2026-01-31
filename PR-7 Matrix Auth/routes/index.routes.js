const express = require("express");
const { dashboardpage, loginpage, loginUser, logOutUser, myprofile, changePasswordPage, changePassword, } = require("../controller/auth.controller");
const passport = require("passport");

const routes = express.Router();

routes.get("/", loginpage)
routes.post("/login", passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.get("/dashboard", dashboardpage);
routes.get("/profile", myprofile);
routes.get("/change-password", changePasswordPage);
routes.post("/changepassword", changePassword);


routes.get("/logOutUser", logOutUser)


routes.use("/admin",passport.checkAuthicate, require("./admin.routes"));
routes.use("/blog", require("./blog.routes"));

module.exports = routes;