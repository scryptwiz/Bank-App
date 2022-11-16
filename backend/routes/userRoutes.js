const express = require('express');
const UserAuth = require('../controller/userController/profileController');
// const { fetchTransaction, transferMoney } = require('../controller/userController/transactionController');
const routes = express.Router()

// User Route
routes.post('/user/signup', UserAuth.signup)
routes.post('/user/sendotp', UserAuth.sendOtp)
routes.get('/user/verifyUser/:id', UserAuth.verifyUser)
routes.post('/user/updateProfile', UserAuth.updateProfile)
routes.post('/user/signin', UserAuth.signin)

// user transaction routes
// routes.post('/user/fetchTransaction', fetchTransaction)
// routes.post('/user/transfer', transferMoney)

module.exports={routes}