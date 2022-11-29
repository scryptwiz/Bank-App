const express = require('express');
const { userSignup, updateProfile, verifyUser, signin } = require('../controller/userController/profileController');
// const { fetchTransaction, transferMoney } = require('../controller/userController/transactionController');
const routes = express.Router()

// User Route
routes.post('/user/signup', userSignup)
routes.get('/user/verifyUser/:id', verifyUser)
routes.post('/user/updateProfile', updateProfile)
routes.post('/user/signin', signin)

// user transaction routes
// routes.post('/user/fetchTransaction', fetchTransaction)
// routes.post('/user/transfer', transferMoney)

module.exports={routes}