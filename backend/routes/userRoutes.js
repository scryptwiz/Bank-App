const express = require('express');
const { signup, signin, updateProfile } = require('../controller/userController/profileController');
const routes = express.Router()

// User Route
routes.post('/user/signup', signup)
routes.post('/user/signin', signin)
routes.post('/user/updateProfile', updateProfile)

module.exports={routes}