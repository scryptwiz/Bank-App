const adminsModel = require("../../models/adminsModel");
const Token = require("../../models/tokenSchema");
const sendMail = require("../mail");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req,res)=> {
    let {username, email, password, first_name, last_name} = req.body;
    if (!email || !password || !username || !first_name || !last_name) return res.status(401).json({message:"All fields must be filled", success:false})

    const _admin_info = new adminsModel({username, email, password, first_name, last_name})

    await _admin_info.save().then(resp=> {
      res.json({
        payload: "user created successfully",
        error: null,
        success: true,
      })
    }).catch(err=> {
      console.log(err.message);
      if (err.keyPattern) res.status(500).json({success: false,payload: null,error: "Email and username must be unique"})

      res.status(500).json({success: false,payload: null,error: "unexpected error"})
    })
}

const sendOtp = async (req,res) =>{
    let { email } = req.body;
    const otp = Math.floor(Math.random()*90000) + 10000;
  
    try {   
      const check_admin = await adminsModel.findOne({email});
      if (!check_admin) {
        return res.status(401).json({message:"Admin not found", success:false})
      } else if (check_admin.verified) {
          return res.status(200).json({message:"Admin account already verified", success:true})
      }
  
      let token = await Token.findOne({ userId: check_admin._id });
      if (!token) {
          token = await new Token({
              userId: check_admin._id,
              token: otp,
          }).save();
      }
  
      await sendMail({email, otp:token.token, subject:"Bank-app admin mail verification otp"});
      res.json({message:"OTP sent to your mail", success:true});
    } catch (error) {
      console.log(error.message);
      res.json({message:"Failed to send otp", success:false});
    }
}

const verify_otp = async (req,res) => {
    let {otp} = req.body
    let id = req.uid
    try {
        if (!otp || !id) return res.status(401).json({message:"All information must be provided", success: false});
  
        const admin = await adminsModel.findById(id);
        if (!admin) return res.status(401).json({message:"Invalid admin", success:false});
        if (admin.verified) return res.status(200).json({message:"Account verified already", success:true});
  
        const token = await Token.findOne({
            userId: admin._id,
            token: otp,
        });
        if (!token) return res.status(401).json({message:"Token not found", success:false});
  
        await adminsModel.updateOne({ _id: admin._id },{ $set: { verified: true } },{ new: true });
        await token.delete();
  
        res.json({message:"Account verified successfully.", success:true});
    } catch (error) {
        res.json({message:"An error occurred", success:false});
    }
}

const login = (req,res) => {
  let {email, password} = req.body;
  if (!email || !password) return res.status(401).json({message:"All fields must be filled", success:false})
  adminsModel.findOne({email}, async (err,result)=>{
    if (err) return res.status(500).json({message: 'An error occurred', success: false})

    if (!result) return res.status(401).json({message: 'Invalid credential', success: false})

    let validatePassword = await bcrypt.compare(password, result.password)
    if(!validatePassword) return res.status(401).json({message: "Invalid credential", success: false})

    const token = jwt.sign({ id: result.id }, process.env.APP_KEY_JWT, { expiresIn: '30m' });
    if (!token) return res.status(503).json({message:"Error generating access token", success:false})

    res.status(200).json({message:"Welcome to Banka", token, success:true })
  })
}

const fileUpload = async(req,res) => {
  let id = req.uid
  if (!req.file) return res.status(302).json({ message: "Failed to upload file", status: false })
  
  adminsModel.updateOne({_id:id}, { profileImage:req.file.path }, (err, result) => {
    if(!result) return res.status(403).json({message:"Admin not found", success:false})
    if(err) return res.status(503).json({message:"Service unavailable", success:false})

    return res.status(200).json({ message: "File Uploaded", status: true, error: null })
  })
}

module.exports = {register,sendOtp,verify_otp,login,fileUpload}