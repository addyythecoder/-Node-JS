const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 579,
    secure: false,
    auth: {
        user: 'giriaditya9422@gmail.com',
        pass: 'dfgfldczjehowldk '
    }
})

const sendEmail = async (message) => {
    let res = await transporter.sendMail(message)
}

module.exports = sendEmail;