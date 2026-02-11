const express = require('express');
const { addAdminPage, addAdmin, viewAdminPage, deleteAdmin, editAdmin,updateAdmin } = require('../controllers/admin.controller');
const uploadImage = require('../middleware/uploadImage');

const routes = express.Router();

routes.get('/add-admin', addAdminPage)
routes.post('/add-admin', uploadImage.single('profileImage'), addAdmin)
routes.get('/view-admin', viewAdminPage)
routes.get('/delete-admin/:id', uploadImage.single('profileImage'), deleteAdmin);
routes.get('/edit-admin/:id', editAdmin);
routes.post('/update-admin/:id', uploadImage.single('profileImage'), updateAdmin);
module.exports = routes;
