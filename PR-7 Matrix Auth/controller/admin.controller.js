const AdminModel = require('../model/admin.model');
const bcrypt = require("bcrypt");
const path = require('path');
const fs = require('fs');

exports.addAdminPage = async (req, res) => {
    try {
        return res.render("admin/addAdmin")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewAdmin = async (req, res) => {
    try {
        let admins = await AdminModel.find();
        return res.render("admin/viewAdmin", { admins })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addadmin = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10)
        
        await AdminModel.create({
            ...req.body,
            password: hashPassword,
            image: imagePath
        });

        return res.redirect("/admin/add-admin")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        let admin = await AdminModel.findById(req.params.id);

        if (admin.image != '') {
            let filepath = path.join(__dirname, '..', admin.image);
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log('Admin Not Found!');
            }
        }
        await AdminModel.findByIdAndDelete(req.params.id);
        return res.redirect("/admin/view-admin")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editAdminPage = async (req, res) => {
    try {
        let admin = await AdminModel.findById(req.params.id);
        return res.render("admin/editAdmin", { admin })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.singleView = async (req, res) => {
    try {
        let admin = await AdminModel.findById(req.params.id);
        return res.render("admin/singleView", { admin })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        let admin = await AdminModel.findById(req.params.id);

        if (!admin) {
            return res.redirect("/dashboard");
        }

        let filepath = admin.adminImage;

        if (req.file) {
            if (admin.image != '') {
                let oldpath = path.join(__dirname, '..', admin.image);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }
        await AdminModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            image: filepath
        }, { new: true })

        return res.redirect("/admin/view-admin")

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}