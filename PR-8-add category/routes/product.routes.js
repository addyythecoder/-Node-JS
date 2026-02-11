const express = require('express');
const { addproductPage, getAllExtraCategory, addproduct, viewproductPage, deleteproduct, editproductpage, updateproduct } = require('../controllers/product.controller');
const uploadImage = require('../middleware/uploadImage');

const route = express.Router();

route.get('/extrasubcategory/:id', getAllExtraCategory);
route.get('/add-product', addproductPage);
route.post('/add-product', uploadImage.single('productImage'), addproduct);
route.get('/view-product', viewproductPage);
route.get('/delete-product/:id', deleteproduct);
route.get('/edit-product/:id', editproductpage);
route.post('/update-product/:id', uploadImage.single('productImage'), updateproduct);



module.exports = route;