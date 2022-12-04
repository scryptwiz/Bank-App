const express = require('express');
const upload = require('../cloudinary/cloud_connect');
const Auth = require('../controller/userController/profileController');
const AdminAuth = require('../controller/adminController/profileController');
const Transaction = require('../controller/userController/transactionController');
const AdminTransactions = require('../controller/adminController/transactionController');
const { verifyToken } = require('../middleware/validate_user_token');
const routes = express.Router()

// User Route
routes.post('/user/register', Auth.register)
routes.post('/user/login', Auth.login)
routes.post('/user/send_otp', verifyToken, Auth.sendOtp)
routes.post('/user/verify_otp', verifyToken, Auth.verify_otp)
routes.post('/user/updateProfile', verifyToken, Auth.updateProfile)
routes.post('/user/fileUpload', [verifyToken, upload.single("picture")], Auth.fileUpload)

// user transaction routes
routes.post('/user/find_recipient', verifyToken, Transaction.find_recipient)
routes.post('/user/transfer', verifyToken ,Transaction.transferMoney)
routes.post('/user/fetch_transaction', verifyToken ,Transaction.transaction_history)

// Admin Auth Route
routes.post('/admin/register', AdminAuth.register)
routes.post('/admin/send_otp', AdminAuth.sendOtp)
routes.post('/admin/login', AdminAuth.login)
routes.post('/admin/verify_otp', verifyToken, AdminAuth.verify_otp)
routes.post('/admin/upload_pics', [verifyToken, upload.single("picture")], AdminAuth.fileUpload)

// Admin Transaction Route
routes.get('/admin/fetch_transaction', verifyToken, AdminTransactions.transaction_history)
routes.get('/admin/fetch_transaction/:reference', verifyToken, AdminTransactions.find_transaction)

module.exports={routes}