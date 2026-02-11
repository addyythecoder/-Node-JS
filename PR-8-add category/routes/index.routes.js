const express = require('express')
const { dashboardpage, loginpage, login, logoutAdmin, forgotPasswordPage, sendotp, verifyotp, verifyotppage, updatePassword, updatePasswordpage, myprofile, changePassword, changePasswordPage } = require('../controllers/auth.controller')
const passport = require('passport')
const routes = express.Router()

routes.get('/', loginpage)
routes.get('/dashboard',passport.checkAuthicate, dashboardpage)
routes.post('/login', passport.authenticate('local',{failureRedirect:'/'}), login);
routes.get('/logout',logoutAdmin);
routes.get('/my-profile',myprofile);
routes.get('/forgot-password',forgotPasswordPage);
routes.get('/change-Password',passport.checkAuthicate,changePasswordPage);
routes.post('/change-Password',changePassword);
routes.post('/send-otp',sendotp);
routes.get('/verify-otp',verifyotppage);
routes.post('/verify-otp',verifyotp);
routes.get('/update-password',updatePasswordpage);
routes.post('/update-password',updatePassword);


routes.use('/admin', passport.checkAuthicate, require('../routes/admin.routes'))
routes.use('/category', passport.checkAuthicate, require('../routes/category.routes'))
routes.use('/subcategory', passport.checkAuthicate, require('../routes/subcategory.routes'))
routes.use('/extrasubcategory', passport.checkAuthicate, require('../routes/extrasubcategory.routes'))
routes.use('/product', passport.checkAuthicate, require('../routes/product.routes'))

module.exports = routes;