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
        const uid= user.uid
        admin.firestore().collection('users').doc(uid).set({uid, balance:0}).then((dbinfo)=>{
          const mailoptions={
            from: process.env.EMAIL,
            to:user.email,
            subject: "Email Verification From Banka App",
            text:  `Your Email Verification link is ${link}`
          }
          transporter.sendMail(mailoptions,function(err,info){
            if (err){
              admin.auth().deleteUser(user.uid)
              .then(() => {
                admin.firestore().collection("users").doc(uid).delete().then(() => {
                  res.send({message:err.message, status:false})
                }).catch((error) => {
                  res.send({message:error.message, status:false})
                });
              })
              .catch((err) => {
                res.send({message:err.message, status:false})
              });
              return;
            }else {
              res.send({user, dbinfo, info:info.response})
            }
          })
        }).catch(error=>{
          admin.auth().deleteUser(user.uid)
          .then(() => {
            res.send({message:error.message, status:false})
          })
          .catch((err) => {
            res.send({message:err.message, status:false})
          });
        })
      })
      .catch((error) => {
        admin.auth().deleteUser(user.uid)
          .then(() => {
            res.send({message:error.message, status:false})
          })
          .catch((err) => {
            res.send({message:err.message, status:false})
          });
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      res.send({message:errorMessage, status:false})
  })
}
const signin =  async (req,res) => {
  let { email, password } = req.body;
  admin.auth().signInWithEmailAndPassword(email,password)
  .then((userCredential) => {
    let user = userCredential.user;
    res.send({message:user, status:true})
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    res.send({message:errorMessage, status:false})
  });
}
const updateProfile =  async (req,res) => {
  let { phoneNumber, displayName, photoURL, uid } = req.body;
  if (!photoURL.length>0) {
    photoURL="https://drive.google.com/file/d/1LaDdvgUbRKT_Z_DCMm2Hy9XfMzCQJz2E/view"
  }
  admin.auth().updateUser(uid, {phoneNumber, displayName, photoURL})
  .then((newRecord) => {
    res.send({message:"Updated successfully", user:newRecord.toJSON(), status:true})
  })
  .catch((error) => {
    let errorMessage = error.message;
    res.send({message:errorMessage, status:false})
  });
}
module.exports={signup, signin,updateProfile}