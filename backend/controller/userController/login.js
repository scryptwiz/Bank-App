const admin = require("../../db/firebase");

const signup = async (req,res)=>{
  let { email, password }=req.body;
    admin.auth().createUser({email, password,emailVerified: false})
    .then((userCredential) => {
      const user = userCredential;
      admin.auth().generateEmailVerificationLink(user.email)
      .then((link) => {
        admin.firestore().collection('users').doc().set({uid:user.uid, balance:0}).then(()=>{
          res.send({user, link})
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