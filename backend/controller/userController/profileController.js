const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require("../../models/usersModel");
const mail = require('../mail');

const signup = async (req,res)=>{
  let { username, email, password }=req.body;
  const otp = Math.floor(Math.random()*90000) + 10000;
  let currentDateObj = new Date();
  let _otpTimeLimit = currentDateObj.getTime()+3*60000;
  const account_no = Math.floor(10000000000 + Math.random() * 90000000000)

  if (email&&password&&account_no) {
    const signup = new usersModel({username, email, account_no, password})
    signup.save( async (err,result)=>{
      if(!err) {
        let verification = await mail({data,otp})
        let _update = {$set:{expire_time:_otpTimeLimit, token:otp}}
        const update_code = await usersModel.updateOne({email}, _update);
        if(update_code ){
            res.json({message: `Signed up successfully ${verification}`, status:true})
        }else{
            res.json({message:"Signed up successfully, Please verify your account",status:true})
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
