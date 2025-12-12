const express = require('express');
const port = 9008;

const server = express();
server.set('view engine', 'ejs');

server.listen(port, (req, res) => {
    console.log(`Server Start At http://localhost:${port}`);
})

server.get('/', (req, res) => {
    return res.render('index');
})
server.get('/charts', (req, res) => {
    return res.render('charts');
})

server.get('/widgets', (req, res) => {
    return res.render('widgets');
})

server.get('/tables', (req, res) => {
    return res.render('tables');
})

server.get('/grid', (req, res) => {
    return res.render('grid');
})

server.get('/form-basic', (req, res) => {
    return res.render('form-basic');
})
server.get('/form-wizard', (req, res) => {
    return res.render('form-wizard');
})

server.get('/pages-buttons', (req, res) => {
    return res.render('pages-buttons');
})

server.get('/icon-material', (req, res) => {
    return res.render('icon-material');
})

server.get('/icon-fontawesome', (req, res) => {
    return res.render('icon-fontawesome');
})

server.get('/pages-elements', (req, res) => {
    return res.render('pages-elements');
})
server.get('/index2', (req, res) => {
    return res.render('index2');
})

server.get('/pages-gallery', (req, res) => {
    return res.render('pages-gallery');
})

server.get('/pages-calendar', (req, res) => {
    return res.render('pages-calendar');
})

server.get('/pages-invoice', (req, res) => {
    return res.render('pages-invoice');
})

server.get('/pages-chat', (req, res) => {
    return res.render('pages-chat');
})
server.get('/authentication-login', (req, res) => {
    return res.render('authentication-login');
})
server.get('/authentication-register', (req, res) => {
    return res.render('authentication-register');
})

server.get('/error-403', (req, res) => {
    return res.render('error-403');
})
server.get('/error-404', (req, res) => {
    return res.render('error-404');
})
server.get('/error-405', (req, res) => {
    return res.render('error-405');
})
server.get('/error-500', (req, res) => {
    return res.render('error-500');
})

server.use(express.static('public'));