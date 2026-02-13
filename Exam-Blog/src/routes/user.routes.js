const express = require('express');
const { addUser, loginUser, getAllBlog, addComment, singleViewBlog } = require('../controller/user.controller');

const uploadImage = require('../middlware/uploadImage');
const { userToken } = require('../middlware/verifyToken');
const routes = express.Router();

routes.post('/add-user', uploadImage.single('uprofileImage'), addUser)
routes.post('/login-user', loginUser)
routes.get('/all-blog',userToken,getAllBlog)
routes.get('/single-view/:id',userToken, singleViewBlog)
routes.post('/comment/:blogId',userToken,addComment)

module.exports = routes;