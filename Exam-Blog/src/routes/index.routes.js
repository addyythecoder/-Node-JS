const express = require('express')
const routes = express.Router();

// routes.use('/admin',require('../routes/admin.routes'));

routes.use('/admin',require('../routes/admin.routes'))
routes.use('/user',require('../routes/user.routes'))


module.exports = routes;