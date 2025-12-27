const bookstore = require('../modal/bookstore.modal')

exports.getALLBook = async (req, res) => {
    let books = await bookstore.find();
    return res.render("index", { books })
}

exports.addbook = async (req, res) => {

    let book = await bookstore.create(req.body);
    return res.redirect("/");
}

exports.deletebook = async (req, res) => {
    let id = req.params.id;
    let book = await bookstore.findById(id);
    if (!book) {
        console.log("Book not found");
    }
    await bookstore.findByIdAndDelete(id);
    return res.redirect("/");
}

exports.editbook = async (req, res) => {
    let book = await bookstore.findById(req.params.id);
    console.log(book);
    return res.render("editbookstore", { book });
}

exports.updatebook = async (req, res) => {
    try {
        let book = await bookstore.findById(req.params.id);
        if (!book) {
            console.log("book store not found");
            return res.redirect("/");
        }
        book = await bookstore.findByIdAndUpdate(book._id, req.body, { new: true });
        return res.redirect("/");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}