const express = require('express');
const Auth = require('../controller/userController/profileController');
// const { fetchTransaction, transferMoney } = require('../controller/userController/transactionController');
const routes = express.Router()

// User Route
routes.post('/user/signup', Auth.userSignup)
routes.get('/user/send_otp', Auth.sendOtp)
routes.get('/user/verify_otp', Auth.verify_otp)
routes.post('/user/updateProfile', Auth.updateProfile)
routes.post('/user/signin', Auth.signin)

// user transaction routes
// routes.post('/user/fetchTransaction', fetchTransaction)
// routes.post('/user/transfer', transferMoney)

module.exports={routes}