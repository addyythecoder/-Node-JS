const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const { StatusCodes } = require('http-status-codes')
const Admin = require('../model/admin.model')
const Blog = require('../model/blog.model')
const Comment = require('../model/comment.model')

exports.registerAdmin = async (req, res) => {
    try {
        let alreadyAdmin = await Admin.findOne({ email: req.body.email })
        if (alreadyAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Already Exist Admin " })
        }
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }

        let hashpassword = await bcrypt.hash(req.body.password, 10);

        let admin = await Admin.create({
            ...req.body,
            password: hashpassword,
            profileImage: imagepath
        })

        return res.status(StatusCodes.CREATED).json({ message: "Admin Created Sucessfully !!", admin })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", err: error.message })

    }

}

exports.loginAdmin = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email })
        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Admin Not Found " })
        }
        let matchpassword = await bcrypt.compare(req.body.password, admin.password)
        if (!matchpassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: " Email and password Not Match !!", err: error.message })
        }

        let payload = {
            adminId: admin._id
        }

        let adminToken = JWT.sign(payload, 'role-admin')

        return res.status(StatusCodes.OK).json({ message: "Login Sucessfully !!", admin, adminToken })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", err: error.message })
    }
}

exports.addBlog = async (req, res) => {
    try {
        let admin = req.user;
        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin Not Found' })
        }
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }
        let blog = await Blog.create({
            ...req.body,
            blogImage: imagepath,
            admin: req.user._id
        })

        return res.status(StatusCodes.CREATED).json({ message: "Blog Created Sucessfully !!", blog })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", err: error.message })

    }

}

exports.deleteBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);

        if (!blog) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Blog Not Found" })
        }

        let filepath;

        if (blog.blogImage != "") {
            filepath = path.join(__dirname, "..", blog.blogImage)
            try {
                await fs.unlinkSync(filepath)

            } catch (error) {
                console.log('file missing');

            }
        }
        let deleteblog = await Blog.findByIdAndDelete(id)

        return res.status(StatusCodes.OK).json({ message: "Blog Deleted Succesfully ", deleteblog })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", err: error.message })
    }
}

exports.uploadBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);

        if (!blog) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Blog Not found " })
        }

        let filepath;
        if (req.file) {
            if (blog.blogImage != "") {
                filepath = path.join(__dirname, "..", blog.blogImage)

                try {
                    await fs.unlinkSync(filepath)

                } catch (error) {
                    console.log('file missing');

                }
            }
            filepath = `/uploads/${req.file.filename}`

        } else {

            filepath = blog.blogImage;
        }

        let updateblog = await Blog.findOneAndUpdate(blog._id, {
            ...req.body,
            blogImage: filepath
        }, { new: true })

        return res.status(StatusCodes.OK).json({ message: "Updated Blog success", updateblog })


    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error', err: error.message })
    }
}

exports.allBlog = async (req, res) => {
    try {
        let blog = await Blog.find();

        return res.status(StatusCodes.OK).json({ message: 'All Blog Record', blog })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Internal Server Error', err: error.message })

    }
}



exports.getBlogComments = async (req, res) => {
    try {

        let blogId = req.params.blogId
        let blog = await Blog.findById(blogId)

        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found" })
        }

        
        if (blog.admin.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access Denied" })
        }

        let comments = await Comment.find({ blog: blogId })
            .populate('user', 'name email')
            .populate('blog', 'title')

        return res.status(200).json({
            totalComments: comments.length,
            comments
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}






// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjk4ZWFjZTQ1OTRkZDhmODljYjExZmJlIiwiaWF0IjoxNzcwOTU4NDQyfQ.9JcIC3mwvNJQvu4SlhwvaVECWYesu9epDoRKpnRmPpY