const usersModel = require("../../models/usersModel");

const fetch_users  = async (req, res) => {
    try {
        let all_users = await usersModel.find({})
        res.status(200).json({ message:"Users Fetched", users:all_users, success:true });
    } catch (error) {
        res.status(500).json({ message:"An error occurred", success:false });
    }
}

const fetch_user  = async (req, res) => {
    let { user_id } = req.params
    try {
        let find_user = await usersModel.find({user_id})
        res.status(200).json({ message:"User Fetched", user:find_user, success:true });
    } catch (error) {
        res.status(500).json({ message:"An error occurred", success:false });
    }
}

const block_user  = async (req, res) => {
    let { user_id } = req.params
    try {
        let found_user = await usersModel.find({ user_id })
        if (!found_user) return res.status(401).json({message:"User not found", success:false})
        
        await usersModel.updateOne({ _id: found_user._id },{ $set: { disabled: true } },{ new: true });
        return res.status(200).json({ message:"User disabled successfully", success:true });
    } catch (error) {
        return res.status(500).json({ message:"An error occurred", success:false });
    }
}

module.exports = { fetch_users, fetch_user, block_user }