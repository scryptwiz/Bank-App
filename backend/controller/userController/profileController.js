const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const usersModel = require("../../models/usersModel");
require('dotenv').config()

const signup = async (req,res)=>{
  let { username, email, password }=req.body;
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
      user:process.env.EMAIL,
      pass:process.env.PASS
    }
  })
  const account_no = Math.floor(10000000000 + Math.random() * 90000000000)
  if (email&&password&&account_no) {
    const signup = new usersModel({username, email, account_no, password})
    signup.save((err,result)=>{
      if(!err) {
        let verificationLink = `http://localhost:2600/api/user/verifyUser/${result._id}`
        try {
          mailTransporter.sendMail({
            from: "Banka App",
            to: `${email}`,
            subject: "Banka App Account Verification ✔",
            text: "Here is your verification link",
            html: `<a href=${verificationLink}>Verify Your Email</a>`,
          }, function(error){
            if (error) {
              res.json({message:"Signed Up Successfully make sure you verify your email", status: true});
            } else {
                res.json({message:"Signed Up Successfully A Mail Has Been Sent To You!" ,status: true});
            }
          });
        } catch(err){
          res.json({message:err.message, status: false});
        }
    } else if (err) {
        if (err.keyPattern.email==1) {
            res.json({message:"Email Already Exist", status: false})
        } else if (err.keyPattern.username==1) {
          res.json({message:"Username Already Exist", status: false})
        } else {
            res.json({message:err.message, status:false})
        }
    }
    })
  } else {
    res.json({message:"All fields must be filled", status:false})
  }
}
const verifyUser = (req,res) => {
  let id = req.params['id']
  usersModel.findById(id, (err)=>{
    if (err){
      if (err.name==="CastError") {
        res.json({message:"Invalid User", status:false})
      } else {
        res.json({message: err.message, status:false})
      }
    }
    else{
      usersModel.findByIdAndUpdate(`${id}`, {verified:true}, (err)=>{
        if(err){
          res.send({message:err.message, status:false})
        }
        else{
          res.json({message:"Email Verified Successfully", status:true})
        }
      })
    }
  })
}
const signin = (req,res) => {
  let {email, password} = req.body;
  usersModel.findOne({email}, async (err,result)=>{
    if (err) {
      res.json({message: 'Network Error', status: false, err})
    } else if (result) {
      let validatePassword = await bcrypt.compare(password, result.password)
      if(validatePassword){
        jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "2h" }, (err, token)=>{
            if(err){
                {err.message=="jwt expired"? res.json({message: "Session timed out, kindly login again", status: false}) : res.json({message:err.message, status:false})}
            } else {
                res.json({message:"Login Succesfully", token, result , status: true})
            }
          })
      } else {
        res.json({message: "Incorrect Password", status: false})
      }
    } else if (result==null) {
      res.json({message: "Email not registered", status:false})
    }
  })
}
const updateProfile =  async (req,res) => {
  let { username, photoURL } = req.body;
  if (!photoURL.length>0) {
    photoURL="https://drive.google.com/file/d/1LaDdvgUbRKT_Z_DCMm2Hy9XfMzCQJz2E/view"
  }
}
module.exports={signup, updateProfile, verifyUser, signin}