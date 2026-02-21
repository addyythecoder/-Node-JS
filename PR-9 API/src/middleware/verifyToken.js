const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const Admin = require('../model/admin.model');
const Manager = require('../model/manager.model');

const adminToken = async (req, res, next) => {
    let authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not Authorize !' })
    }

    let adminToken = authorization.split(" ")[1]
    let { adminId } = JWT.verify(adminToken, 'role-admin')

    let admin = await Admin.findById(adminId)

    if (admin) {
        req.user = admin
        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' })
    }
}

const managerToken = async (req, res, next) => {
    let authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not Authorize !' })
    }

    let managerToken = authorization.split(" ")[1]
    let { managerId } = JWT.verify(managerToken, 'role-manager')

    let manager = await Manager.findById(managerId)

    if (manager) {
        req.user = manager
        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' })
    }
}

const employeeToken = async (req, res, next) => {
    let authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not Authorize !' })
    }

    let employeeToken = authorization.split(" ")[1]
    let { employeeId } = JWT.verify(employeeToken, 'role-employee')

    let employee = await Employee.findById(employeeId)

    if (employee) {
        req.user = employee
        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' })
    }
}

module.exports = { adminToken, managerToken, employeeToken };