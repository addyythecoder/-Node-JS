const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const fs = require('fs');
const JWT = require('jsonwebtoken');
const path = require('path');
const Manager = require('../model/manager.model');
const Employee = require('../model/employee.model');
const sendEmail = require('../middleware/nodemailar');

exports.loginManager = async (req, res) => {
    try {
        let manager = await Manager.findOne({ email: req.body.email, isDelete: false });

        if (!manager) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Manager Not Found' });
        }

        let matchpassword = await bcrypt.compare(req.body.password, manager.password)
        if (!matchpassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: " Email and password Not Match !!" })
        }

        let payload = {
            managerId: manager._id
        }
        let managerToken = JWT.sign(payload, 'role-manager')

        return res.status(StatusCodes.CREATED).json({ message: 'Manager Login successfull', manager, managerToken })
    } catch (error) {
        console.log('error');
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error', err: error.message });
    }
}

exports.myprofile = async (req, res) => {
    try {
        let manager = req.user;
        if (!manager || manager.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Manager not found ' })
        }

        return res.status(StatusCodes.OK).json({ message: 'Manager Profile', manager });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ' Server Error', err: error.message })
    }
}

exports.updateManager = async (req, res) => {
    try {
        let manager = await Manager.findById(req.params.id);

        if (!manager || manager.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Manager Not Found' });
        }

        let filepath = manager.managerImage;

        if (req.file) {
            if (manager.managerImage != "") {
                let oldpath = path.join(__dirname, '..', manager.managerImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    return res.status(StatusCodes.BAD_GATEWAY).json({ message: 'old file is missing' });
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }

        let updateManager = await Manager.findByIdAndUpdate(req.params.id, {
            ...req.body,
            managerImage: filepath
        }, { new: true });

        return res.status(StatusCodes.OK).json({ manager: 'Manager Update', updateManager });

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ' Server Error', err: error.message })
    }
}

exports.addEmployee = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let existemployee = await Employee.findOne({ email: req.body.email, isDelete: false });
        if (existemployee) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Employee Already Exist " })
        }
        let imagePath = req.file ? `/uploads/${req.file.filename}` : "";

        let hashPassword = await bcrypt.hash(req.body.password, 10);

        let employee = await Employee.create({
            ...req.body,
            password: hashPassword,
            employeeImage: imagePath
        })

        let message = {
            from: `giriaditya9422@gmail.com`,
            to: `bodardakshit2@gmail.com`,
            subject: 'Your Details',
            html: `
                    <h3>Hello ${name}</h3>
                    <p>Your Employee account has been created by Manager.</p>
                        <p><b>Email:</b> ${email}</p>
                        <p><b>Password:</b> ${password}</p>
                        <p>Please login Your Account</p>   
                    `
        }
        sendEmail(message);

        return res.status(StatusCodes.CREATED).json({ message: "Employee Created Sucessfully ", employee });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ' Server Error', err: error.message })
    }
}


exports.viewAllEmployee = async (req, res) => {
    try {
        let employee = await Employee.find({ isDelete: false });

        return res.status(StatusCodes.OK).json({ message: 'All Employee ', employee });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ' Server error', err: error.message })
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee || employee.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Employee Not Found' })
        }

        let filepath = employee.employeeImage;

        if (req.file) {
            if (employee.employeeImage != '') {
                let oldpath = path.join(__dirname, '..', employee.employeeImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    return res.status(StatusCodes.BAD_GATEWAY).json({ message: 'old file is missing' })
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }

        let updateEmployee = await Employee.findByIdAndUpdate(req.params.id, {
            ...req.body,
            employeeImage: filepath
        }, { new: true });

        return res.status(StatusCodes.OK).json({ message: 'Employee Update  ', updateEmployee });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ' Server error', err: error.message })
    }
}

exports.deleteEmployee = async (req, res) => {
    try {

        let id = req.params.id;
        let employee = await Employee.findById(id);

        if (!employee || employee.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Employee Not Found' })
        }

        let filepath;
        if (req.file) {
            if (employee.employeeImage != "") {
                filepath = path.join(__dirname, '..', employee.employeeImage)
                try {
                    await fs.unlinkSync(filepath)
                } catch (error) {
                    console.log('Old File Missing');
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Old File Missing' });
                }
            }
        }

        let deleteEmployee = await Employee.findByIdAndUpdate(employee._id, { isDelete: true }, { new: true });

        return res.status(StatusCodes.OK).json({ message: 'Employee Deleted ', deleteEmployee });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ' Server error', err: error.message })
    }
}