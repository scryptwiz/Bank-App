const express = require('express');
const { signup } = require('../controller/userController/signup');
const routes = express.Router()

routes.post('/', signup)

module.exports={routes}