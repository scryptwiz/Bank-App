const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    profileImage: {
        type:String,
        default: '',
        require: true
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps:true})

adminSchema.pre('save', async function (next){
    let {password} = this;
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, saltRound);
    next();
})
const adminsModel = mongoose.model("Admin", adminSchema)

module.exports = adminsModel;