const express = require("express");
const { addBlogPage, addblog, viewBlog, editBlogPage, deleteBlog, updateBlog, singleView } = require("../controller/blog.controller");
const uploadImage = require("../middleware/imageUpload");

const routes = express.Router();

routes.get("/add-blog", addBlogPage);
routes.get("/view-blog", viewBlog);
routes.post("/add-blog", uploadImage.single('blogImage'), addblog);
routes.get("/delete-blog/:id", deleteBlog);
routes.post("/update-blog/:id", uploadImage.single('blogImage'), updateBlog);
routes.get("/edit-blog/:id", editBlogPage);
routes.get("/single-view/:id", singleView);

module.exports = routes;