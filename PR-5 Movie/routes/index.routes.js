const express = require("express");
const { getmovies, addmovie, addmoviedata, deletemovie, editmovie, updatemovie, genres, movies } = require("../controller/index.contoller");
const uploadsimage = require("../middleware/uploadimg");

const routes = express.Router();


routes.get("/", getmovies);
routes.get("/add-movie", addmovie);
routes.get("/movies",movies)
routes.post("/addmoviedata", uploadsimage.single("ProfileImage"), addmoviedata);
routes.get("/delete-movie/:id", deletemovie);
routes.get("/edit-movie/:id", editmovie);
routes.post("/update-movie/:id",uploadsimage.single("ProfileImage"),updatemovie);

module.exports = routes;