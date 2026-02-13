const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const { StatusCodes } = require('http-status-codes')
const User = require('../model/user.model')
const Blog = require('../model/blog.model')
const Comment = require('../model/comment.model')

exports.addUser = async (req, res) => {
    try {
        let alreadyUser = await User.findOne({ email: req.body.email })
        if (alreadyUser) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Already Exist User " })
        }
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }

        let hashpassword = await bcrypt.hash(req.body.password, 10);

        let user = await User.create({
            ...req.body,
            password: hashpassword,
            uprofileImage: imagepath
        })

        return res.status(StatusCodes.CREATED).json({ message: "User Created Sucessfully !!", user })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", err: error.message })

    }

}

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "user Not Found " })
        }
        let matchpassword = await bcrypt.compare(req.body.password, user.password)
        if (!matchpassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: " Email and password Not Match !!", err: error.message })
        }

        let payload = {
            userId: user._id
        }

        let userToken = JWT.sign(payload, 'role-user')

        return res.status(StatusCodes.OK).json({ message: "Login Sucessfully !!", user, userToken })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", err: error.message })
    }
}
exports.getAllBlog = async (req, res) => {
    try {

        let blogs = await Blog.find()
            .populate('admin', 'name email')

        return res.status(StatusCodes.OK).json({
            message: 'All Blog Record', blogs
        })

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error', err: error.message })
    }
}
exports.addComment = async (req, res) => {
    try {

        let blogId = req.params.blogId

        let blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(StatusCodes.NOT_FOUND)
                .json({ message: "Blog Not Found" })
        }

        let comment = await Comment.create({
            ...req.body,
            blog: blogId,
            user: req.user._id
        })

        return res.status(StatusCodes.CREATED)
            .json({ message: "Comment Added Successfully", comment })

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal Server Error" })
    }
}
exports.singleViewBlog = async (req, res) => {
    try {

        let blogId = req.params.id

        let blog = await Blog.findById(blogId)
            .populate('admin', 'name email')

        if (!blog) {
            return res.status(StatusCodes.NOT_FOUND)
                .json({ message: "Blog Not Found" })
        }

        
        let comments = await Comment.find({ blog: blogId })
            .populate('user', 'name email')

        return res.status(StatusCodes.OK).json({
            message: "Single Blog View",
            blog,
            totalComments: comments.length,
            comments
        })

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal Server Error" })
    }
}



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OThlYzBmZDI1M2YwNDRkYjA0OTYwMGIiLCJpYXQiOjE3NzA5NjQwMzN9.4ioF0ozucD752tfRh9yk4r9nNecGYzbi_6MhUoy5u7g