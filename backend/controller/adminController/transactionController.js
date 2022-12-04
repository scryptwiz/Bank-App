const transactionsModel = require("../../models/transactionModel");

const transaction_history = async (req,res) => {
    try {
        let all_transactions = await transactionsModel.find({})
        res.status(200).json({ message:"Transaction Fetched", transactions:all_transactions, success:true });
    } catch (error) {
        res.status(500).json({ message:"An error occurred", success:false });
    }
}

const find_transaction = async (req,res) => {
    let { reference } = req.params
    try {
        let all_transactions = await transactionsModel.find({reference})
        res.status(200).json({ message:"Transaction Fetched", transactions:all_transactions, success:true });
    } catch (error) {
        res.status(500).json({ message:"An error occurred", success:false });
    }
}

module.exports = {transaction_history,find_transaction}