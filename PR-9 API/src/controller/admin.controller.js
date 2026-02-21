const { StatusCodes } = require('http-status-codes');
const Admin = require('../model/admin.model');
const Manager = require('../model/manager.model');
const Employee = require('../model/employee.model');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const path = require('path')
const fs = require('fs');
const sendEmail = require('../middleware/nodemailar');

exports.RegisterAdmin = async (req, res) => {
    try {
        let exist = await Admin.findOne({ email: req.body.email, isDelete: false })
        if (exist) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Already Exist Admin " })
        }
        let imagePath = req.file ? `/uploads/${req.file.filename}` : "";

        let hashPassword = await bcrypt.hash(req.body.password, 10);

        let admin = await Admin.create({
            ...req.body,
            password: hashPassword,
            adminImage: imagePath
        })

        return res.status(StatusCodes.CREATED).json({ message: 'Admin Added Success', admin })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Admin Not Added !!' });
    }
}

exports.loginAdmin = async (req, res) => {
    try {

        let admin = await Admin.findOne({ email: req.body.email, isDelete: false })
        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin Not Found' })
        }
        let matchpassword = await bcrypt.compare(req.body.password, admin.password)
        if (!matchpassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: " Email and password Not Match !!" })
        }

        let payload = {
            adminId: admin._id
        }

        let adminToken = JWT.sign(payload, 'role-admin')

        return res.status(StatusCodes.CREATED).json({ message: 'Login Admin Success', admin, adminToken })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Admin Not Added !!' });
    }
}

exports.getAllAdmin = async (req, res) => {
    try {
        let admin = await Admin.find({ isDelete: false });

        return res.status(StatusCodes.OK).json({ message: 'All Admins ', admin });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Admin Not Found", err: error.message })
    }
}

exports.singleViewAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);

        if (!admin || admin.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin Not Found' })
        }

        return res.status(StatusCodes.OK).json({ message: 'Single Admin ', admin });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", err: error.message })
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);

        if (!admin || admin.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin Not Found' })
        }

        let filepath;
        if (req.file) {
            if (admin.adminImage != "") {
                filepath = path.join(__dirname, '..', admin.adminImage)
                try {
                    await fs.unlinkSync(filepath)
                } catch (error) {
                    console.log('Old File Missing');
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Old File Missing' });
                }
            }
        }

        let deleteAdmin = await Admin.findByIdAndDelete(admin._id, { isDelete: true }, { new: true });

        return res.status(StatusCodes.OK).json({ message: 'Admin Deleted ', deleteAdmin });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", err: error.message })
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);

        if (!admin || admin.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin Not Found' })
        }

        let filepath = admin.adminImage;

        if (req.file) {
            if (admin.adminImage != '') {
                let oldpath = path.join(__dirname, '..', admin.adminImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    return res.status(StatusCodes.BAD_GATEWAY).json({ message: 'old file is missing' })
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }

        let updateAdmin = await Admin.findByIdAndUpdate(req.params.id, {
            ...req.body,
            adminImage: filepath
        }, { new: true });

        return res.status(StatusCodes.OK).json({ message: 'Admin Update  ', updateAdmin });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", err: error.message })
    }
}

exports.myProfile = async (req, res) => {
    try {
        let admin = req.user;
        if (!admin || admin.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'data Not Found ' })
        }
        return res.status(StatusCodes.OK).json({ message: 'My Profile', data: req.user });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error', err: error.message });
    }
}

exports.changePassword = async (req, res) => {
    try {
        let { oldPass, newPass, ConfirmPass } = req.body;
        let admin = req.user;
        if (!admin || admin.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Data Not Found' })
        }


        let matchpass = await bcrypt.compare(oldPass, admin.password)
        if (!matchpass) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Password Not Matched' });
        }

        if (newPass == ConfirmPass) {
            let hashPassword = await bcrypt.hash(newPass, 10);
            await Admin.findByIdAndUpdate(admin._id, {
                password: hashPassword
            }, { new: true });
            return res.status(StatusCodes.OK).json({ message: 'Password Changed !!' })
        }

        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Old & New Password Not Matched !!' })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error', err: error.message });
    }
}

exports.addManager = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let existmanager = await Manager.findOne({ email: req.body.email });
        if (existmanager) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Manager Already Exist " })
        }
        let imagePath = req.file ? `/uploads/${req.file.filename}` : "";

        let hashPassword = await bcrypt.hash(req.body.password, 10);

        let manager = await Manager.create({
            ...req.body,
            password: hashPassword,
            managerImage: imagePath
        })

        let message = {
            from: `giriaditya9422@gmail.com`,
            to: `bodardakshit2@gmail.com`,
            subject: 'Your Details',
            html: `
            <h3>Hello ${name}</h3>
            <p>Your manager account has been created by admin.</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Password:</b> ${password}</p>
                <p>Please login Your Account</p>   
            `
        }
        sendEmail(message);

        return res.status(StatusCodes.CREATED).json({ message: "Manager Created Sucessfully ", manager })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", err: error.message })
    }
}

exports.viewAllManager = async (req, res) => {
    try {
        let manager = await Manager.find({ isDelete: false });

        if (!manager) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Manager Not Found ' });
        }

        return res.status(StatusCodes.OK).json({ message: 'All Manager ', manager });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Manager Not Found", err: error.message })
    }
}

exports.updateManager = async (req, res) => {
    try {
        let manager = await Manager.findById(req.params.id);

        if (!manager || manager.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Manager Not Found' })
        }

        let filepath = manager.managerImage;

        if (req.file) {
            if (manager.managerImage != '') {
                let oldpath = path.join(__dirname, '..', manager.managerImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    return res.status(StatusCodes.BAD_GATEWAY).json({ message: 'old file is missing' })
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }

        let updateManager = await Manager.findByIdAndUpdate(req.params.id, {
            ...req.body,
            managerImage: filepath
        }, { new: true });

        return res.status(StatusCodes.OK).json({ message: 'Manager Update  ', updateManager });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Manager Not Found", err: error.message })
    }
}

exports.dalateManager = async (req, res) => {
    try {

        let id = req.params.id;
        let manager = await Manager.findById(id);

        if (!manager || manager.isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Manager Not Found' })
        }

        let filepath;
        if (req.file) {
            if (manager.managerImage != "") {
                filepath = path.join(__dirname, '..', manager.managerImage)
                try {
                    await fs.unlinkSync(filepath)
                } catch (error) {
                    console.log('Old File Missing');
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Old File Missing' });
                }
            }
        }

        let deleteManager = await Manager.findByIdAndUpdate(manager._id, { isDelete: true }, { new: true });

        return res.status(StatusCodes.OK).json({ message: 'Manager Deleted ', deleteManager });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Manager Not Found", err: error.message })
    }
}

exports.viewAllEmployee = async (req, res) => {
    try {
        let employee = await Employee.find({ isDelete: false });

        if (!employee || isDelete === true) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Employee Not Found ' });
        }

        return res.status(StatusCodes.OK).json({ message: 'All Employee Record ', employee })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ' Server Error' })
    }
}
