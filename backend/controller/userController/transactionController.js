const { v4: uuidv4 } = require('uuid');
const transactionsModel = require('../../models/transactionModel');
const usersModel = require('../../models/usersModel');

const find_recipient = async (req,res) => {
    let {recipient_acc_no} = req.body;
    let id = req.uid;
    if (!recipient_acc_no) return res.status(401).json({message:"Recipient account number must be provided", success:false})
    try {
        const sender = await usersModel.findById({_id:id})
        if (!sender) return res.status(401).json({message:"Sender not found", success:false})
        if (sender.disabled) return res.status(401).json({message:"Your account has been disabled, You can check your mail to see the reason why your account has been disabled.", success:false})
        if (sender.account_no==recipient_acc_no) return res.status(403).json({message:"You can't fund yourself!", success:false})
        
        try {
            const recipient = await usersModel.findOne({account_no:recipient_acc_no})
            if (!recipient) return res.status(401).json({message:"Recipient not found", success:false})
            res.status(200).json({recipient_id:recipient._id,recipient_name:`${recipient.first_name} ${recipient.last_name}`, sender_acc_no:sender.account_no, success:true})
        } catch (error) {
            res.status(500).json({message:"An error occurred", success:false, error:error.message})
        }
    } catch (error) {
        res.status(500).json({message:"An error occurred", success:false, error:error.message})
    }
}

const transferMoney = async (req,res) => {
    let {sender_acc_no, recipient_acc_no, amount, note, recipient_id} = req.body
    let id = req.uid;
    let reference_no = uuidv4()
    if (!sender_acc_no || !recipient_acc_no || !amount || !note || !recipient_id ) return res.status(401).json({message:"All necessary field must be filled", success:false})

    const _new_transaction = new transactionsModel({reference_no, users_id:[ id,recipient_id ], sender_acc_no, recipient_acc_no, amount, note})
    try {
        const set_transaction = await _new_transaction.save()
        res.status(200).json({message:"Transaction successful", transaction:set_transaction, success:true});
    } catch (error) {
        res.status(500).json({message:"Sorry, failed to make transaction, try again!", error:error.message,success:false});
    }
}

const transaction_history = async (req,res) => {
    let id = req.uid;
    try {
        let user_transactions = await transactionsModel.find({ users_id: { $in: [id] },})
        res.status(200).json({ message:"Transaction Fetched", transactions:user_transactions, success:true });
    } catch (error) {
        res.status(500).json({ message:"An error occurred", success:false });
    }
}

module.exports = { find_recipient, transferMoney, transaction_history }