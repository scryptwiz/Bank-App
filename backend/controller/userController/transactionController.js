const admin = require("../../db/firebase");

const fetchTransaction = (req,res) =>{

}

const transferMoney = (req,res) => {
    let { amount, recipientAccNo, refrence, senderAccNo } = req.body
    admin.firestore().collection('transfers').doc().set({amount, recipientAccNo, refrence, senderAccNo})
    .then((dbinfo)=>{
        res.json({message:dbinfo, status:true})
    }).catch(err=>{
        res.send({message:err.message, status:false})
    })
}
module.exports={fetchTransaction,transferMoney}