const express = require("express");
const { addBlogPage, addblog, viewBlog, editBlogPage, deleteBlog, updateBlog, singleView } = require("../controller/blog.controller");
const uploadImage = require("../middleware/imageUpload");

const routes = express.Router();

routes.get("/add-blog", addBlogPage);
routes.post("/add-blog", uploadImage.single('image'), addblog);
routes.get("/delete-blog/:id", deleteBlog);
routes.get("/view-blog", viewBlog);
routes.post("/update-blog/:id", uploadImage.single('image'), updateBlog);
routes.get("/edit-blog/:id", editBlogPage);

routes.get("/single-view/:id", singleView);

module.exports = routes;