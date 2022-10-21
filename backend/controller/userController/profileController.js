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
  const account_no = Math.floor(10000000000 + Math.random() * 90000000000)
  if (email&&password&&account_no) {
    userMo
  } else {
    res.json({message:"All fields must be filled", status:false})
  }
}
const updateProfile =  async (req,res) => {
  let { phoneNumber, displayName, photoURL, uid } = req.body;
  if (!photoURL.length>0) {
    photoURL="https://drive.google.com/file/d/1LaDdvgUbRKT_Z_DCMm2Hy9XfMzCQJz2E/view"
  }
}
module.exports={signup, updateProfile}