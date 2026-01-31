const BlogModel = require('../model/blog.model');
const path = require("path");
const fs = require('fs')

exports.addBlogPage = async (req, res) => {
    try {
        // let admin = req.user;
        return res.render("blog/addBlog")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewBlog = async (req, res) => {
    try {
        // let admin = req.user;
        let blogs = await BlogModel.find();
        return res.render("blog/viewBlog", { blogs})
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editBlogPage = async (req, res) => {
    try {
        // let admin = req.user;
        let blog = await BlogModel.findById(req.params.id);
        return res.render("blog/editBlog", { blog })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.singleView = async (req, res) => {
    try {
        // let admin = req.user;
        let blog = await BlogModel.findById(req.params.id);
        return res.render("blog/singleView", { blog })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        let blog = await BlogModel.findById(req.params.id);

        if (!blog) {
            console.log("Blog not found");
            return res.redirect("/blog/view-blog");
        }

        if (blog.image && blog.image !== "") {
            let filepath = path.join(__dirname, "..", blog.image);

            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }

        await BlogModel.findByIdAndDelete(req.params.id);
        return res.redirect("/blog/view-blog");

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};


exports.addblog = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        let newBlog = await BlogModel.create({
            ...req.body,
            image: imagePath
        });
        return res.redirect("/blog/add-blog")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateBlog = async (req, res) => {
    try {
        let blog = await BlogModel.findById(req.params.id);

        if (!blog) {
            console.log('Blog Not Found !');
            return res.redirect("/dashboard");
        }

        let filepath = blog.image;

        if (req.file) {
            if (blog.image != '') {
                let oldpath = path.join(__dirname, '..', blog.image);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }
        await BlogModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            image: filepath
        }, { new: true })

        return res.redirect("/blog/view-blog")

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}