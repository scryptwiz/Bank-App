const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema ({
    reference_no: {
        type:String,
        required: true,
        unique:true
    },
    users_id: {
        type: Array,
        required: true,
    },
    sender_acc_no: {
        type:String,
        required: true
    },
    recipient_acc_no: {
        type:String,
        required:true
    },
    amount: {
        type:String,
        required: true
    },
    note: {
        type:String,
        required: true
    }
}, {timestamps:true})

const transactionsModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionsModel