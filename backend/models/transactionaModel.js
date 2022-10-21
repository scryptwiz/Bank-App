const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema ({
    senderAccNo: {
        type:String,
        required: true
    },
    recipientAccNo: {
        type:String,
        required:true
    },
    amount: {
        type:String,
        required: true
    },
    reference:{
        type:String,
        required: true
    }
}, {timestamps:true})

const transactionsModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionsModel