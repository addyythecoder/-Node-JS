const express = require('express');
const { loginEmployee, myprofile, updateEmployee } = require('../controller/exployee.controller');
const { employeeToken } = require('../middleware/verifyToken');
const uploadImage = require('../middleware/uploadImage');

const routes = express.Router();

routes.post("/login-employee", loginEmployee);
routes.get('/my-profile', employeeToken, myprofile);
routes.put('/update-employee/:id', employeeToken, uploadImage.single('employeeImage'), updateEmployee);

module.exports = routes;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiNjk4ZjMxMGU3NmQxZWM0NjFjZThiY2U4IiwiaWF0IjoxNzcxMjQ1NTcxfQ.5MTEflgCGu1tt75awAdgRmT-qeyMthGenYjzlpNX54A