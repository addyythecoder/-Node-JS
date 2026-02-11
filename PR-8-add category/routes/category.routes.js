const express = require('express');
const { addCategoryPage, addCategory, getallcategory, deletecategory, editcategory, updatecategory } = require('../controllers/category.controller');
const uploadImage = require('../middleware/uploadImage');
const route = express.Router();

route.get('/add-category', addCategoryPage);
route.post('/add-category', uploadImage.single('categoryImage'), addCategory);
route.get('/view-category', getallcategory)
route.get('/delete-category/:id', deletecategory)
route.get('/edit-category/:id', editcategory)
route.post('/update-category/:id',uploadImage.single('categoryImage'), updatecategory)


module.exports = route;