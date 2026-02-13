const express = require('express');
const { registerAdmin, loginAdmin, addBlog, deleteBlog, uploadBlog, allBlog, getBlogComments } = require('../controller/admin.controller');
const uploadImage = require('../middlware/uploadImage');
const {adminToken} = require('../middlware/verifyToken');
const routes = express.Router();

routes.post('/register', uploadImage.single('profileImage'), registerAdmin);
routes.post('/login', loginAdmin);
routes.post('/add-blog', adminToken, uploadImage.single('blogImage'), addBlog)
routes.put('/update-blog/:id', adminToken, uploadImage.single('blogImage'), uploadBlog)
routes.delete('/delete-blog/:id', adminToken, deleteBlog)
routes.get('/all-blog', adminToken, allBlog)
routes.get('/blog-comments/:blogId', adminToken, getBlogComments)


module.exports = routes;