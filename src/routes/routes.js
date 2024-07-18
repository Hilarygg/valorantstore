const express = require('express')
const router = express.Router()
const {signUp, login, updateUser, user } = require('./../controller/userController')

router.post('/login', login)
router.post('/signUp', signUp)