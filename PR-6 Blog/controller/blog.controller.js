const Blog = require('../model/blog.model');
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require('fs')

exports.addBlogPage = async (req, res) => {
    try {
        return res.render("blog/addBlog")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewBlog = async (req, res) => {
    try {
        let blogs = await Blog.find();
        return res.render("blog/viewBlog", { blogs })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editBlogPage = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        return res.render("blog/editBlog", { blog })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.singleView = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        return res.render("blog/singleView", { blog })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (blog.blogImage != '') {
            let filepath = path.join(__dirname, '..', blog.blogImage);
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log('Blog Not Found!');
            }
        }
        await Blog.findByIdAndDelete(req.params.id);
        return res.redirect("/blog/view-blog")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addblog = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10)

        let newBlog = await Blog.create({
            ...req.body,
            password: hashPassword,
            blogImage: imagePath
        });
        return res.redirect("/blog/add-blog")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            console.log('Blog Not Found !');
            return res.redirect("/dashboard");
        }

        let filepath = blog.blogImage;

        if (req.file) {
            if (blog.blogImage != '') {
                let oldpath = path.join(__dirname, '..', blog.blogImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }
        await Blog.findByIdAndUpdate(req.params.id, {
            ...req.body,
            blogImage: filepath
        }, { new: true })

        return res.redirect("/blog/view-blog")

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}