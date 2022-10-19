const express = require('express');
const { signup, updateProfile } = require('../controller/userController/profileController');
const { fetchTransaction } = require('../controller/userController/transactionController');
const routes = express.Router()

// User Route
routes.post('/user/signup', signup)
routes.post('/user/updateProfile', updateProfile)

// user transaction routes
routes.post('/user/fetchTransaction', fetchTransaction)

module.exports={routes}