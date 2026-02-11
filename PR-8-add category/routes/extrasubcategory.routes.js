const express = require('express');
const { addextrasubcategory, addextrasubcategorypage, viewextrasubcategory, editextrasubcategorypage, updateextrasubcategory, deleteextrasubcategory, getAllsubcategory } = require('../controllers/extrasubcategory.controller');
const route = express.Router();

route.get('/add-extrasubcategory',addextrasubcategorypage)
route.get('/subcategory/:id',getAllsubcategory)
route.post('/add-extrasubcategory',addextrasubcategory)
route.get('/view-extrasubcategory',viewextrasubcategory)
route.get('/edit-extrasubcategory/:id',editextrasubcategorypage)
route.post('/update-extrasubcategory/:id',updateextrasubcategory)
route.get('/delete-extrasubcategory/:id',deleteextrasubcategory)

module.exports = route;