const Admin = require('../model/admin.model')
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt')
exports.addAdminPage = async (req, res) => {
    try {
        // if (req.cookies && req.cookies.seesionadmin && req.cookies.seesionadmin._id) {
        //     return res.render('admin/addAdmin');
        // } else {
        //     return res.redirect('/');
        // }
        return res.render('admin/addAdmin');


    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.addAdmin = async (req, res) => {
    try {
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }

        let hashpassword = await bcrypt.hash(req.body.password, 10)
        let admin = await Admin.create({
            ...req.body,
            password: hashpassword,
            profileImage: imagepath
        })

        req.flash('success', 'Add Successfully !!');
        return res.redirect('/admin/view-admin');

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}

exports.viewAdminPage = async (req, res) => {
    try {
        let admin = await Admin.find();

        // if (req.cookies && req.cookies.seesionadmin && req.cookies.seesionadmin._id) {

        //     let admin = await Admin.find();
        //     return res.render('admin/viewAdmin', { admin });
        // } else {
        //     return res.redirect('/');
        // }
        return res.render('admin/viewAdmin', { admin });

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
exports.deleteAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);

        if (admin.profileImage != "") {
            let filepath = path.join(__dirname, "..", admin.profileImage);
            try {
                await fs.unlinkSync(filepath);
            } catch (error) {
                console.log('file is missing');
            }
        }
        await Admin.findByIdAndDelete(id);
        return res.redirect('/admin/view-admin');
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
exports.editAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);
        return res.render('admin/editAdmin', { admin });

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
exports.updateAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);

        if (req.file) {
            if (admin.profileImage != '') {
                let filepath = path.join(__dirname, "..", admin.profileImage)
                try {
                    await fs.unlinkSync(filepath);
                } catch (error) {
                    console.log('file is missing');
                }

            }
            filepath = `/uploads/${req.file.filename}`
        }
        else {
            filepath = admin.profileImage;
        }

        let update = await Admin.findByIdAndUpdate(admin._id, {
            ...req.body,
            profileImage: filepath
        }, { new: true })

        return res.redirect('/admin/view-admin');
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}   