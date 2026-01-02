
const Movies = require("../model/index.model")
const path = require("path");
const fs = require("fs");

exports.getmovies = async (req, res) => {
    try {
        const movies = await Movies.find();

        return res.render("home", { movies });
        
    }
    catch (err) {
        console.log("something went wrong");
    }
}

exports.addmovie = (req, res) => {

    try {
        return res.render("add-movie");
    }
    catch (err) {
        console.log("something went wrong");
    }
}

exports.movies = (req, res) => {
    try {
        return res.render("movies");
    }
    catch (err) {
        console.log("something went wrong");
    }
}

exports.genres = (req, res) => {
    try {
        return res.render("genres");
    }
    catch (err) {
        console.log("something went wrong");
    }
}

exports.addmoviedata = async (req, res) => {
    try {
        // console.log(req.body);
        // let movie = await Movies.create(req.body);
        // console.log(movie);
        // return res.redirect("/");

        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        let movie = await Movies.create({
            ...req.body,
            ProfileImage: imagepath
        })
        return res.redirect("/");
    }
    catch (err) {
        console.log("Error occured");
    }
}

exports.deletemovie = async (req, res) => {
    try {
        let id = req.params.id;
        let movie = await Movies.findById(id);
        if (!movie) {
            console.log("movie not found");
        }
        let filepath = "";
        if (movie.ProfileImage != "") {
            filepath = path.join(__dirname, "..", movie.ProfileImage);
        }

        try {
            await fs.unlinkSync(filepath);
        }
        catch (err) {
            console.log("fill is missing");
        }

        await Movies.findByIdAndDelete(id);
        return res.redirect("/");
    }
    catch (err) {
        console.log("something went wrong");
    }
}

exports.editmovie = async (req, res) => {
    try {
        let movie = await Movies.findById(req.params.id);
        console.log(movie);
        return res.render("edit-movie", { movie });
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

exports.updatemovie = async (req, res) => {
    try {
        let movie = await Movies.findById(req.params.id);
        if (!movie) {
            console.log("movie not found");
        }
        let filepath = "";
        if (req.file) {
            if (movie.ProfileImage != "") {
                filepath = path.join(__dirname, "..", movie.ProfileImage);
                try{
                    await fs.unlinkSync(filepath);
                }
                catch(err){
                    console.log("file is missing");
                }
            }

            filepath = `/uploads/${req.file.filename}`;

        }
        else {
            filepath = movie.ProfileImage;
        }
        movie = await Movies.findByIdAndUpdate(movie._id, {...req.body, ProfileImage: filepath}, { new: true });
        return res.redirect("/");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }


}