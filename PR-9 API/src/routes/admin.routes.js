const express = require('express');
const { RegisterAdmin, loginAdmin, getAllAdmin, singleViewAdmin, deleteAdmin, updateAdmin, myProfile, changePassword, addManager, viewAllManager, updateManager, dalateManager, viewAllEmployee } = require('../controller/admin.controller');
const uploadImage = require('../middleware/uploadImage');
const { adminToken } = require('../middleware/verifyToken');

const routes = express.Router();

routes.post("/register-admin", uploadImage.single('adminImage'), RegisterAdmin);
routes.post("/login-admim", loginAdmin);
routes.get("/", adminToken, getAllAdmin);
routes.get("/my-profile/:id", adminToken, myProfile);
routes.get("/admin-singleview/:id", adminToken, singleViewAdmin);
routes.delete("/delete-admin/:id", adminToken, uploadImage.single('adminImage'), deleteAdmin);
routes.put("/update-admin/:id", adminToken, uploadImage.single('adminImage'), updateAdmin);
routes.post("/change-password", adminToken, changePassword);

//manager 
routes.post('/add-manager', adminToken, uploadImage.single('managerImage'), addManager);
routes.get('/view-manager', adminToken, viewAllManager);
routes.delete("/delete-manager/:id", adminToken, dalateManager);
routes.put("/update-manager/:id", adminToken, uploadImage.single('managerImage'), updateManager);

routes.get('/view-all-employee', adminToken, viewAllEmployee)

module.exports = routes;



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjk4YjUwMGFmNzQxZjI0NThmMTdmYWEzIiwiaWF0IjoxNzcwNzkzODYyfQ.b2qTbMF_6nZP3kLLzr8IqGwCgCsCSDSDxzBVtsE44sY
//john

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjk4YjUwNDBmNzQxZjI0NThmMTdmYWE1IiwiaWF0IjoxNzcwNzk0NDQ2fQ.EyKIuC9yzQxGLNOp1HBOU7yeQT3h3iM_Wv5bFJmr2Xk
//jolly