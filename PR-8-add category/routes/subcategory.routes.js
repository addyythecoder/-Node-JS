const express = require('express');
const { addSubcategory, addSubcategorypage, viewSubcategory, editsubcategorypage, updatesubcategory, deletesubcategory } = require('../controllers/subcategory.controller');
const route = express.Router();

route.get('/add-subcategory', addSubcategorypage);
route.post('/add-subcategory', addSubcategory);
route.get('/view-subcategory', viewSubcategory);
route.get('/edit-subcategory/:id', editsubcategorypage);
route.post('/update-subcategory/:id', updatesubcategory);
route.get('/delete-subcategory/:id', deletesubcategory);
module.exports = route;