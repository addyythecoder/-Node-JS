const express = require('express');

const routes = express.Router();

routes.use("/admin", require("../routes/admin.routes.js"));

routes.use("/manager", require("../routes/manager.routes.js"));

routes.use("/employee", require("../routes/employee.routes.js"));

module.exports = routes;