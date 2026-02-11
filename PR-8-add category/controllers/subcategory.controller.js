let Category = require('../model/category.model')
let subCategory = require('../model/subcategory.model');
let extrasubCategory = require('../model/extrasubcategory.model')
exports.addSubcategorypage = async (req, res) => {
    try {
        let category = await Category.find();
        return res.render('subcategory/addsubcategory', { category })

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}

exports.addSubcategory = async (req, res) => {
    try {
        let subcategory = await subCategory.create(req.body);
        req.flash('success', 'Add successfully !')
        return res.redirect('/subcategory/add-subcategory');

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}

exports.viewSubcategory = async (req, res) => {
    try {
        let subcategory = await subCategory.find().populate('categoryId')
        return res.render('subcategory/viewsubcategory', { subcategory })


    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}
exports.editsubcategorypage = async (req, res) => {
    try {
        let id = req.params.id;
        let subcategory = await subCategory.findById(id);
        let category = await Category.find();

        return res.render('subcategory/editsubcategory', { subcategory, category });

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.updatesubcategory = async (req, res) => {
    try {
        let id = req.params.id;
        let subcategory = await subCategory.findById(id);

        await subCategory.findByIdAndUpdate(subcategory._id, req.body, { new: true })
        req.flash('success', 'updated successfully !')
        return res.redirect('/subcategory/view-subcategory')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')

    }
}

exports.deletesubcategory = async (req, res) => {
    try {
        let id = req.params.id;
        let subcategory = await subCategory.findById(id);


        await extrasubCategory.deleteMany({ subcategoryId: subcategory._id })
        await subCategory.findByIdAndDelete(id);
        req.flash('success', 'deleted successfully !')
        return res.redirect('/subcategory/view-subcategory');
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
