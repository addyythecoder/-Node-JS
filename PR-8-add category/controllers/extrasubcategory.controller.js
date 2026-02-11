const Category = require('../model/category.model')
const SubCategory = require('../model/subcategory.model')
const ExtraSubCategory = require('../model/extrasubcategory.model')

exports.getAllsubcategory = async (req, res) => {
    try {
        let subcategory = await SubCategory.find({ categoryId: req.params.id })
        return res.json({ Message: 'Sub Category Fetch', data: subcategory })

    } catch (error) {
        console.log(error);
        return res.json({ Message: 'Server error', error: error.Message })
    }

}

exports.addextrasubcategorypage = async (req, res) => {
    try {
        const category = await Category.find();
        // const subcategory = await SubCategory.find();
        // const extrasubcategory = await ExtraSubCategory.find();
        return res.render('extrasubcategory/addextrasubcategory', { category });

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}
exports.addextrasubcategory = async (req, res) => {
    try {

        const extrasubcategory = await ExtraSubCategory.create(req.body)
        req.flash('success', 'Add successfully !')

        return res.redirect('/extrasubcategory/add-extrasubcategory')

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}
exports.viewextrasubcategory = async (req, res) => {
    try {

        const extrasubcategory = await ExtraSubCategory.find().populate('categoryId').populate('subcategoryId')
        return res.render('extrasubcategory/viewextrasubcategory', { extrasubcategory })

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}
exports.editextrasubcategorypage = async (req, res) => {
    try {
        let id = req.params.id;
        let extrasubcategory = await ExtraSubCategory.findById(id);
        let subcategory = await SubCategory.find();
        let category = await Category.find();
        return res.render('extrasubcategory/editextrasubcategory', { extrasubcategory, subcategory, category })

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}
exports.updateextrasubcategory = async (req, res) => {
    try {
        let id = req.params.id;
        let extrasubcategory = await ExtraSubCategory.findById(id);
        let subcategory = await SubCategory.find();
        let category = await Category.find();

        await ExtraSubCategory.findByIdAndUpdate(extrasubcategory._id, { ...req.body }, { new: true });
        req.flash('success', 'updated successfully !')


        return res.redirect('/extrasubcategory/view-extrasubcategory');

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}
exports.deleteextrasubcategory = async (req, res) => {
    try {
        let id = req.params.id;
        let extrasubcategory = await ExtraSubCategory.findById(id);
        let subcategory = await SubCategory.find();
        let category = await Category.find();


        await ExtraSubCategory.findByIdAndDelete(id);

        req.flash('success', 'deleted successfully !')

        return res.redirect('/extrasubcategory/view-extrasubcategory');

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}

