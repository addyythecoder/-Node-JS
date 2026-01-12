const express = require("express");
const { dashboardpage, loginpage,  } = require("../controller/auth.controller");

const routes = express.Router();

routes.get("/", loginpage)
routes.get("/dashboard", dashboardpage);

routes.use("/blog" , require("./blog.rautes"))

module.exports = routes;