const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require("../mail");
const usersModel = require("../../models/usersModel");
const Token = require("../../models/tokenSchema");
require('dotenv').config()

const register = async (req,res)=> {
    let {username, email, password} = req.body;
    const account_no = Math.floor(10000000000 + Math.random() * 90000000000)
    if (!email || !password || !username || !account_no) return res.status(401).json({message:"All fields must be filled", success:false})

    const _userinfo = new usersModel({username, email, account_no, password})

    await _userinfo.save().then(resp=> {
      res.json({
        payload: "user created successfully",
        error: null,
        success: true,
      })
    }).catch(err=> {
      if (err.keypattern) res.status(500).json({success: false,payload: null,error: "your email and username has to be unique"})

      res.status(500).json({success: false,payload: null,error: "unexpected error"})
    })
}

const sendOtp = async (req,res) =>{
  let { email } = req.body;
  const otp = Math.floor(Math.random()*90000) + 10000;

  try {   
    const check_user = await usersModel.findOne({email});
    if (!check_user) {
      return res.status(401).json({message:"user not found", success:false})
    } else if (check_user.verified) {
        return res.status(200).json({message:"user already verified", success:true})
    }

    let token = await Token.findOne({ userId: check_user._id });
    if (!token) {
        token = await new Token({
            userId: check_user._id,
            token: otp,
        }).save();
    }

    console.log(token);
    await sendMail(email, otp, "Bank-app email verification otp");
    res.json({message:"OTP sent to your mail", success:true});
  } catch (error) {
    res.json({message:"Failed to send otp", success:false});
  }
}

const verify_otp = async(req,res) => {
  let {otp, id} = req.body
  try {
      if (!otp || !id) return res.status(401).json({message:"All information must be provided", success: false});

      const user = await usersModel.findById(id);
      if (!user) return res.status(401).json({message:"Invalid user", success:false});

      const token = await Token.findOne({
          userId: user._id,
          token: otp,
      });
      if (!token) return res.status(401).json({message:"Token not found", success:false});

      await usersModel.updateOne({ _id: user._id },{ $set: { verified: true } },{ new: true });
      await token.delete();

      res.json({message:"Account verified successfully.", success:true});
  } catch (error) {
      res.json({message:"An error occurred", success:false});
      console.log(error);
  }
}

const login = (req,res) => {
  let {email, password} = req.body;
  if (!email || !password) return res.status(401).json({message:"All fields must be filled", success:false})
  usersModel.findOne({email}, async (err,result)=>{
    if (err) return res.status(500).json({message: 'An error occurred', success: false})

    if (!result) return res.status(401).json({message: 'Invalid credential', success: false})

    let validatePassword = await bcrypt.compare(password, result.password)
    if(!validatePassword) return res.status(401).json({message: "Invalid credential", success: false})

    const token = jwt.sign({ id: result.id }, process.env.APP_KEY_JWT, { expiresIn: '30m' });
    if (!token) return res.status(503).json({message:"Error generating access token", success:false})

    res.status(200).json({message:"Welcome to Banka", token, success:true })
  })
}

const updateProfile =  async (req,res) => {
  let { username, photoURL } = req.body;
  if (!photoURL.length>0) {
    photoURL="https://drive.google.com/file/d/1LaDdvgUbRKT_Z_DCMm2Hy9XfMzCQJz2E/view"
  }
}
module.exports={register, updateProfile, login, sendOtp, verify_otp}
