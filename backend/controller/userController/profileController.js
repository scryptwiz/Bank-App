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
  let mailOptions = {
    from: "Banka App",
    to: `${email}`,
    subject: "Banka App Account Verification ✔",
    text: "Here is your verification link",
    html: "<a href='http://localhost:2600/api/user/verify/'>Verify Your Email</a>",
  };
  const account_no = Math.floor(10000000000 + Math.random() * 90000000000)
  if (email&&password&&account_no) {
    const signup = new usersModel({username, email, account_no, password})
    signup.save(err=>{
      if(!err) {
        try {
          mailTransporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.json({message:"Signed Up Successfully make sure you verify your email", status: true});
            } else {
              try {
                usersModel.findOneAndUpdate({email}, {verified:true}, { new: true });
                res.json({message:"Signed Up Successfully" ,status: true});
              } catch (error) {
                console.log(error);
                res.json({message:"Signed Up Successfully But Not Verified", status: true});
              }
            }
          });
        } catch(err){
          res.json({message:err.message, status: false});
        }
    } else if (err) {
        if (err.keyPattern.email==1) {
            res.json({message:"Email Already Existed", status: false})
        } else if (err.keyPattern.username==1) {
          res.json({message:"Username Already Existed", status: false})
        } else {
            res.json({message:err.message, status:false})
        }
    }
    })
  } else {
    res.json({message:"All fields must be filled", status:false})
  }
}

const updateProfile =  async (req,res) => {
  let { username, photoURL } = req.body;
  if (!photoURL.length>0) {
    photoURL="https://drive.google.com/file/d/1LaDdvgUbRKT_Z_DCMm2Hy9XfMzCQJz2E/view"
  }
}
module.exports={signup, updateProfile}