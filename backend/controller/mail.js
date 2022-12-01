require('dotenv').config()
const nodemailer = require("nodemailer")

const sendMail = async ({email, otp, subject}) =>{
    try {
        let mailTransporter = await nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASS,
            },
        });
        const mail = {
            from:process.env.EMAIL,
            to:email,
            subject,
            text:`Welcome to Bank App Your Verification code is shown below Code:${otp}`
        }
       let _resp = await mailTransporter.sendMail(mail)
       if(_resp){
        let msg = "A code has been send to your email"
        return msg
       }
       return true
    } catch (error) {
        throw error
    }
}
module.exports = sendMail
