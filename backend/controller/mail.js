const nodemailer = require("nodemailer");
require('dotenv').config()

const mail = async ({data, otp}) => {
    try {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        })
        const mail ={
            from: process.env.EMAIL,
            to: data,
            subject: "Banka App Account Verification ✔",
            html: `Welcome to Bank App <br> Yout Verification code is sown below code: ${otp}`
        }
        let _resp = await mailTransporter.sendMail(mail);
        if (_resp) {
            let msg = ""
            return msg;
        }
        return true;
    } catch(err){
        throw err
    }
}

module.exports = mail