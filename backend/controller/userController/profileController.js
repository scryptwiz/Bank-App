const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require("../mail");
const usersModel = require("../../models/usersModel");
const Token = require("../../models/tokenSchema");
require('dotenv').config()

const userSignup = async (req,res)=> {
    let {username, email, password} = req.body;
    const account_no = Math.floor(10000000000 + Math.random() * 90000000000)
    if (!email || !password || !username) {
      return res.status(401).json({message:"All fields must be filled", success:false})
    }

    const _userinfo = new usersModel({username, email, account_no, password})
    try {
      const _createuser = await _userinfo.save()
      if (!_createuser) {
        throw new Error(JSON.stringify({
          message: "Failed signup",
          status: 401
        }))
      }

      res.json({
        payload: "user created successfully",
        error: null,
        success: true,
      })
    } catch (error) {
      const { message, status } = JSON.parse(error.message)

      res.status(status||500).json({
        success: false,
        payload: null,
        error: message
      })
    }
}

const sendOtp = async (req,res) =>{
  let { email } = req.body;
  const otp = Math.floor(Math.random()*90000) + 10000;

  try {   
    const check_user = await usersModel.findOne({email});
    if (!check_user) {
      return res.status(401).json({message:"user not found", success:"false"})
    } else if (check_user.verified) {
        return res.status(200).json({message:"user already verified", success:false})
    }

    let token = await Token.findOne({ userId: check_user._id });
    if (!token) {
        token = await new Token({
            userId: check_user._id,
            token: otp,
        }).save();
    }

    await sendMail(email, otp, "Password reset");
    res.json({message:"OTP sent to your mail", success:true});
  } catch (error) {
    res.json({message:"Failed to send otp", success:false});
  }
}

const verify_otp = async(req,res) => {
  let {otp, id} = req.body
  try {
      if (!otp) return res.status(401).json({message:"otp not provided", success: false});

      const user = await usersModel.findById(id);
      if (!user) return res.status(401).json({message:"Invalid ", success:false});

      const token = await Token.findOne({
          userId: user._id,
          token: otp,
      });
      if (!token) return res.status(400).json({message:"Invalid token", success:false});

      await usersModel.updateOne({ _id: user._id },{ $set: { verified: true } },{ new: true });
      await token.delete();

      res.json({message:"Account verified successfully.", success:true});
  } catch (error) {
      res.json({message:"An error occurred", success:false});
      console.log(error);
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
module.exports={userSignup, updateProfile, verifyUser, signin, sendOtp, verify_otp}