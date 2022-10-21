const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    profileImage: {
        type:String,
        default: '',
        require: true
    },
    password:{
        type: String,
        required: true
    },
    balance:{
        type: String,
        required: true,
        default:0
    },
    account_no:{
        type:String,
        required: true,
        unique:true
    }
}, { timestamps: true });

userSchema.pre('save', async function (next){
    let {password} = this;
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, saltRound);
    next();
})

const usersModel = mongoose.model("User", userSchema)

module.exports = usersModel;