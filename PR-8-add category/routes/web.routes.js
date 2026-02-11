const express = require('express');
const { allProductpage, singleview, addtocart, cart, deletecart, cartminus, cartpuls } = require('../controllers/web.controller');
const routes = express.Router();

routes.get('/', allProductpage);
routes.get('/singleview/:id', singleview);
routes.post('/addtocart/:id', addtocart);
routes.get('/cart', cart);
routes.get('/deletecart/:id', deletecart);







module.exports = routes;