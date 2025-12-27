const express = require('express');
const routers = express.Router();

const { getALLBook, addbook, deletebook, editbook, updatebook } = require('../controller/book.controller');

routers.get("/",getALLBook)

routers.post("/add-book",addbook)

routers.get("/Deletebook/:id",deletebook)

routers.get("/Editbook/:id",editbook)

routers.post("/update-book/:id",updatebook)


module.exports = routers;