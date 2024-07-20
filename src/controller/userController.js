const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const userDoc = await User.findUser(email)

        if (!userDoc) {
            return res.status(400).json({
                message: 'USUARIO NO ENCONTRADO',
                success: false
            })
        }

        const isValidPass = await User.verifyPassword(password, userDoc.password)
        if(!isValidPass) {
            return res.status(401).json({
                message: 'CREDENCIALES INVALIDAS',
                success: false
            })
        }

        const token = jwt.sign(
            { email:userDoc.email },
            process.env.SECRET,
            { expiresIn: '1h' })

        res.status(200).json({
            success: true,
            token,
            user:userDoc
        })
    } catch (error) {
        res.status(500).json({
            message: 'INTERNAL SERVER ERROR',
            success: false,
            error
        })
    }
}

module.exports = { login }