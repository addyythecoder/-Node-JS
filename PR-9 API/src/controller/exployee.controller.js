const { StatusCodes } = require('http-status-codes');
const Employee = require('../model/employee.model');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

exports.loginEmployee = async (req, res) => {
    try {
        let employee = await Employee.findOne({ email: req.body.email, isDelete: false });

        if (!employee) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Employee Not Found' });
        }

        let matchpass = await bcrypt.compare(req.body.password, employee.password);
        if (!matchpass) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Email and Password are not match !!" })
        }

        let payload = {
            employeeId: employee._id
        }

        let employeeToken = JWT.sign(payload, 'role-employee');

        return res.status(StatusCodes.CREATED).json({ message: 'Employee Login', employee, employeeToken });

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' })
    }
}

exports.myprofile = async (req, res) => {
    try {
        let employee = req.user;

        if (!employee || employee.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Employee  Not Found " })
        }

        return res.status(StatusCodes.OK).json({ message: "Employee Profile  !!", employee })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' })
    }
}


exports.updateEmployee = async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee || employee.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Employee Not Found' });
        }

        let filepath = employee.employeeImage;

        if (req.file) {
            if (employee.employeeImage != "") {
                let oldpath = path.join(__dirname, '..', employee.employeeImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    return res.status(StatusCodes.BAD_GATEWAY).json({ message: 'old file is missing' });
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }

        let updateEmployee = await Employee.findByIdAndUpdate(req.params.id, {
            ...req.body,
            employeeImage: filepath
        }, { new: true });

        return res.status(StatusCodes.OK).json({ manager: 'Employee Update Successfully', updateEmployee });

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ' Server Error', err: error.message })
    }
}

