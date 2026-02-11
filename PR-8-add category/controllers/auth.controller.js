let Admin = require('../model/admin.model')
const bcrypt = require('bcrypt')
let otpGenerator = require('otp-generator');
const sendEmail = require('../middleware/sendmailconfig');
exports.loginpage = async (req, res) => {
    try {
        // if (req.cookies && req.cookies.seesionadmin && req.cookies.seesionadmin._id) {
        //     return res.redirect('/dashboard');
        // } else {
        //     return res.render('login');
        // }
        if (req.isAuthenticated()) {
            return res.redirect('/dashboard');
        } else {
            return res.render('login')
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/');

    }
}
exports.dashboardpage = async (req, res) => {
    try {
        // if (req.cookies && req.cookies.seesionadmin && req.cookies.seesionadmin._id) {
        // return res.render('dashboard');
        // } else {
        //     return res.redirect('/');
        // }
        // console.log("user:",req.user);
        if (req.isAuthenticated()) {
            return res.render('dashboard');
        } else {
            return res.redirect('/')
        }

        // return res.render('dashboard');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}
exports.login = async (req, res) => {
    try {
        // let admin = await Admin.findOne({ email: req.body.email })
        // console.log(admin);

        // if (!admin) {
        //     console.log('Admin not Found !!');
        //     return res.redirect('/');
        // }
        // let matchpass = await bcrypt.compare(req.body.password, admin.password)
        // if (!matchpass) {
        //     console.log('Password Not Match !!');
        //     return res.redirect('/');
        // }
        // res.cookie('seesionadmin', admin);
        req.flash('success', 'login successfully !!')
        return res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.logoutAdmin = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.redirect('/dashboard')
            }
            else {
                return res.redirect('/');
            }

        });

        // res.clearCookie('seesionadmin')
        // return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.forgotPasswordPage = async (req, res) => {
    try {
        return res.render('forgotpassword/forgotpassword')

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}


exports.sendotp = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            console.log('admin Not Found !!');
            return res.redirect('/forgot-password');
        }
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

        let meassage = {
            from: `ayushidaslani75@gmail.com`,
            to: `${admin.email}`,
            subject: 'Reset Password OTP',
            html: `
            <p>Hi there,
               We received a request to reset your password.
                Use the OTP below to continue: </p>
            <h1>OTP :- ${otp}</h1>
            <p>For security reasons, this OTP is valid for a limited time.</p>
            `
        }
        sendEmail(meassage);
        res.cookie('otp', otp);
        res.cookie('email', admin.email);
        return res.redirect('/verify-otp');


    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}
exports.verifyotppage = async (req, res) => {
    try {
        return res.render('forgotpassword/verifyotp');

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}
exports.verifyotp = async (req, res) => {
    try {
        let otp = req.cookies.otp;
        if (otp == req.body.otp) {
            res.clearCookie('otp');
            return res.redirect('/update-password');
        }
        else {
            console.log('otp not matched !!');
            return res.redirect('/verify-otp');
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}
exports.updatePasswordpage = async (req, res) => {
    try {
        return res.render('forgotpassword/updatePassword')

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}
exports.updatePassword = async (req, res) => {
    try {
        let email = req.cookies.email;
        if (req.body.password != req.body.cpassword) {
            console.log('password not match');
            return res.redirect('/update-password')
        }

        let hashpassword = await bcrypt.hash(req.body.password, 10);

        let admin = await Admin.findOneAndUpdate({ email: email }, { password: hashpassword }, { new: true });
        res.clearCookie('email');
        return res.redirect('/');

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.myprofile = async(req,res)=>{
    try{
        return res.render('myprofile')

    }catch(error){
         console.log(error);
        return res.redirect('/');
    }
}
exports.changePasswordPage = async (req, res) => {
    try {
        return res.render('changepassword')

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}
exports.changePassword = async (req, res) => {
    try {
        let { newpass, oldpass, cpassword } = req.body;
        let user = req.user;
        let matchpass = await bcrypt.compare(oldpass, user.password)

        if (!matchpass) {
            console.log('old password not match ');
            return res.redirect('/change-password');
        }

        if (newpass == cpassword) {
            let hashpassword = await bcrypt.hash(newpass, 10);
            await Admin.findByIdAndUpdate(user._id, {
                password: hashpassword
            }, { new: true })
            return res.redirect('/dashboard')
        } else {
            console.log('new & confirm password not match ');
            return res.redirect('/change-password');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}