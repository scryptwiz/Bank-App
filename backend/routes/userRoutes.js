const express = require('express');
const Auth = require('../controller/userController/profileController');
// const { fetchTransaction, transferMoney } = require('../controller/userController/transactionController');
const routes = express.Router()

// User Route
routes.post('/user/register', Auth.register)
routes.get('/user/send_otp', Auth.sendOtp)
routes.get('/user/verify_otp', Auth.verify_otp)
routes.post('/user/updateProfile', Auth.updateProfile)
routes.post('/user/login', Auth.login)

// user transaction routes
// routes.post('/user/fetchTransaction', fetchTransaction)
// routes.post('/user/transfer', transferMoney)

module.exports={routes}