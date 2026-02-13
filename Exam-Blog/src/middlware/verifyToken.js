const JWT = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const Admin = require('../model/admin.model')
const User = require('../model/user.model')



const adminToken = async (req, res, next) => {

    let authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not a Authorization ' })
    }

    let adminToken = authorization.split(" ")[1]
    let { adminId } = JWT.verify(adminToken, 'role-admin')

    let admin = await Admin.findById(adminId)

    if (admin) {
        req.user = admin
        next();

    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid Token " })
    }

}

const userToken = async (req, res, next) => {

    let authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not a Authorization ' })
    }

    let userToken = authorization.split(" ")[1]
    let { userId } = JWT.verify(userToken, 'role-user')

    let user = await User.findById(userId)

    if (user) {
        req.user = user
        next();

    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid Token " })
    }

}





module.exports = {adminToken, userToken};