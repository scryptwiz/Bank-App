const admin = require("../../db/firebase");
const nodemailer = require("nodemailer");
require('dotenv').config()

const signup = async (req,res)=>{
  const transporter = nodemailer.createTransport({
    service:"hotmail",
    auth: {
      user:process.env.EMAIL,
      pass:process.env.PASS
    }
  })
  let { email, password }=req.body;
    admin.auth().createUser({email, password,emailVerified: false})
    .then((userCredential) => {
      const user = userCredential;
      admin.auth().generateEmailVerificationLink(user.email)
      .then((link) => {
        admin.firestore().collection('users').doc().set({uid:user.uid, balance:0}).then(()=>{
          const options={
            from:process.env.EMAIL,
            to:user.email,
            subject: "Email Verification From Banka App",
            text:  `Your Email Verification link is ${link}`
          }
          transporter.sendMail(options,function(err,info){
            if (err){
              res.send(err.message)
              return;
            }
            res.send({user, info:info.response})
          })
        }).catch(err=>{
          res.send(err.message)
        })
      })
      .catch((error) => {
        res.send(error.message)
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      res.send({message:errorMessage, status:false})
  })
}
module.exports={signup}