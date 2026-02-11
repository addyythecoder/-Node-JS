const Category = require('../model/category.model')
const SubCategory = require('../model/subcategory.model')
const ExtraSubCategory = require('../model/extrasubcategory.model')
const Product = require('../model/product.model')
const fs = require('fs')
const path = require('path')

exports.getAllExtraCategory = async (req, res) => {
    try {
        let extrasubcategory = await ExtraSubCategory.find({ subcategoryId: req.params.id })
        return res.json({ Message: 'Sub Category Fetch', data: extrasubcategory })

    } catch (error) {
        console.log(error);
        return res.json({ Message: "Server Error", error: error.Message })
    }
}
exports.addproductPage = async (req, res) => {
    try {
        let category = await Category.find();
        return res.render('product/addproduct', { category })

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
exports.addproduct = async (req, res) => {
    try {
        let imagepath = '';
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }
        let product = await Product.create({
            ...req.body,
            productImage: imagepath
        })
        if (!product) {
            req.flash('error', 'product not added !!')
        }
        req.flash('success', 'Add successfully !')
        return res.redirect('/product/view-product')
        


    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.viewproductPage = async (req, res) => {
    try {
        let products = await Product.find();
        return res.render('product/viewproduct', { products })

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
exports.deleteproduct = async (req, res) => {
    try {
        let id = req.params.id;
        let products = await Product.findById(id);

        if (products.productImage != '') {
            let filepath = path.join(__dirname, '..', products.productImage)
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log('file missing');
            }
        }
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Delete successfully !')
        return res.redirect('/product/view-product')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.editproductpage = async (req, res) => {
    try {
        let id = req.params.id;
        let product = await Product.findById(id);
        let category = await Category.find();
        let subCategory = await SubCategory.find();
        let extrasubCategory = await ExtraSubCategory.find();
        return res.render('product/editproduct', { product, category, subCategory, extrasubCategory })

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
exports.updateproduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = await Product.findById(id);

        if (req.file) {
            if (product.productImage != '') {
                let filepath = path.join(__dirname, '..', product.productImage)
                try {
                    await fs.unlinkSync(filepath)
                }
                catch (error) {
                    console.log('file missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`
        } else {
            filepath = product.productImage;
        }
        let update = await Product.findByIdAndUpdate(product._id, {
            ...req.body,
            productImage: filepath,
        }, { new: true })

        req.flash('success', 'Update Sucessfully!!')

        return res.redirect('/product/view-product')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
