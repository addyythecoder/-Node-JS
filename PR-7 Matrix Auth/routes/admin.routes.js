const express = require('express');
const { addAdminPage, addadmin, viewAdmin, deleteAdmin, updateAdmin, editAdminPage, singleView } = require('../controller/admin.controller');
const uploadImage = require("../middleware/imageUpload");

const routes = express.Router();

routes.get("/add-admin", addAdminPage);
routes.post("/add-admin", uploadImage.single('image'), addadmin);
routes.get("/delete-admin/:id", deleteAdmin);
routes.get("/view-admin", viewAdmin);
routes.post("/update-admin/:id", uploadImage.single('image'), updateAdmin);
routes.get("/edit-admin/:id", editAdminPage);

routes.get("/single-view/:id", singleView);

module.exports = routes;