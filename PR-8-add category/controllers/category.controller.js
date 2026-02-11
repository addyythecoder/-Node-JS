const Category = require('../model/category.model')
const subcategory = require('../model/subcategory.model')
const extraSubCategory = require('../model/extrasubcategory.model')
const path = require('path');
const fs = require('fs');
exports.getallcategory = async (req, res) => {
    try {

        let category = await Category.find();
        return res.render('category/viewcategory', { category })
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.addCategoryPage = async (req, res) => {
    try {
        return res.render('category/addcategory')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}

exports.addCategory = async (req, res) => {
    try {
        let imagepath = req.file ? `/uploads/${req.file.filename}` : "";

        let category = await Category.create({
            ...req.body,
            categoryImage: imagepath
        })

        if (!category) {
            req.flash('error', 'category not found !!');
        }
        req.flash('success', 'Add successfully !')
        return res.redirect('/category/view-category')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}

exports.deletecategory = async (req, res) => {
    try {
        let id = req.params.id;
        let category = await Category.findById(id);

        let filepath = '';
        if (category.categoryImage != '') {
            filepath = path.join(__dirname, "..", category.categoryImage)
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log('file is missing ');
            }
        }
        await Category.findByIdAndDelete(id)
        await subcategory.deleteMany({ categoryId: category._id })
        await extraSubCategory.deleteMany({ categoryId: category._id })
        req.flash('success', 'delete successfully !')

        return res.redirect('/category/view-category');

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.editcategory = async (req, res) => {
    try {
        let id = req.params.id;
        let category = await Category.findById(id);
        return res.render('category/editcategory', { category });

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}
exports.updatecategory = async (req, res) => {
    try {
        let id = req.params.id;
        let category = await Category.findById(id);
        let filepath;
        if (req.file) {
            if (category.categoryImage != '') {
                filepath = path.join(__dirname, '..', category.categoryImage)
                try {
                    await fs.unlinkSync(filepath);
                } catch (error) {
                    console.log('file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`
        } else {
            filepath = category.categoryImage;
        }
        let update = await Category.findByIdAndUpdate(category._id, {
            ...req.body,
            categoryImage: filepath,
        }, { new: true })

        req.flash('success', 'Updated successfully !')
        
        return res.redirect('/category/view-category')
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}