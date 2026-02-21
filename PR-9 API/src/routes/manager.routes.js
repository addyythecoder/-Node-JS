const express = require('express');
const { loginManager, myprofile, updateManager, addEmployee, viewAllEmployee, deleteEmployee, updateEmployee } = require('../controller/manager.controller');
const { managerToken } = require('../middleware/verifyToken');
const uploadImage = require('../middleware/uploadImage');

const routes = express.Router();

routes.post("/login-manager", loginManager);
routes.get("/my-profile", managerToken, myprofile);
routes.put("/update-manager/:id", managerToken, uploadImage.single('managerImage'), updateManager);

routes.post("/add-employee", managerToken, uploadImage.single('employeeImage'), addEmployee);
routes.get('/view-all-employee', managerToken, viewAllEmployee);
routes.delete('/delete-employee/:id', managerToken, deleteEmployee);
routes.put('/update-employee/:id', managerToken, uploadImage.single('employeeImage'), updateEmployee);


module.exports = routes;



//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYW5hZ2VySWQiOiI2OThkZWE5YmM3ZTYxYmMzZDAyZjdhZjUiLCJpYXQiOjE3NzA5ODk3MTl9.rnOTfFz2P9sAfrh1Qwz9o-oPs41EMh51dtwHWKJu2Gs