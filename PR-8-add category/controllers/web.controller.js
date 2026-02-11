const Category = require('../model/category.model')
const SubCategory = require('../model/subcategory.model')
const ExtraSub = require('../model/extrasubcategory.model')
const Product = require('../model/product.model')
const Cart = require('../model/web.model')

exports.allProductpage = async (req, res) => {
    try {
        let category = await Category.find();
        let subcategory = await SubCategory.find().populate("categoryId");
        let extrasubcategory = await ExtraSub.find().populate("subcategoryId");
        let product = await Product.find().populate('extrasubcategoryId');
        const cartItems = await Cart.find().populate('productId');

        const cartCount = await Cart.countDocuments();
        res.render('web/allproduct', {
            category,
            subcategory,
            extrasubcategory,
            product,
            cartCount,
            cartItems
        });

    } catch (error) {
        console.log(error);
    }
}
exports.singleview = async (req, res) => {
    try {
        let id = req.params.id;
        let product = await Product.findById(id).populate('categoryId')
        return res.render('web/singleview', { product });

    } catch (error) {
        console.log(error);
    }
}

exports.addtocart = async (req, res) => {
    try {
        const productId = req.params.id;
        const alreadyAdded = await Cart.findOne({ productId });

        if (!alreadyAdded) {
            await Cart.create({ productId });
        }
        res.redirect('/web');
    } catch (error) {
        console.log(error);
    }
};


exports.cart = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId');
        let grandTotal = 0;
        cartItems.forEach(item => {
            grandTotal += item.productId.productPrice * item.quantity;
        });

        res.render('web/cart', {
            cartItems,
            grandTotal
        });

    } catch (error) {
        console.log(error);
    }
};

exports.deletecart = async (req, res) => {
    try {
        const cartId = req.params.id;

        await Cart.findByIdAndDelete(cartId);

        res.redirect('/web'); 
    } catch (error) {
        console.log(error);
    }
};
