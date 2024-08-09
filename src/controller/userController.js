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

const user = async (req, res) => {
    try {
        const email = req.params.email

        const user = await User.findUser(email)

        if (!user) {
            return res.status(404).json({
                message: 'USUARIO NO ENCONTRADO',
                success: false
            })
        }

        return res.status(200).json({
            message: 'USUARIO ENCONTRADO',
            success: true,
            user
        })

    } catch (error) {
        res.status(500).jso({
            message: 'INTERNAL SERVER ERROR',
            success: false,
            error
        })
    }
}

const signUp = async(req, res) => {
    try{
        const { nickname, nombre, paterno, materno, nacimiento, password, genero, email, telefono } = req.body

        const existingEmail = await User.findUser(email)

        if (existingEmail) {
            return res.status(400).json({
                message: 'EMAIL YA ESTA REGISTRADO' ,
                success: false
            })
        }

        const newUser = await User.createUser(nickname, nombre, paterno, materno, nacimiento, password, genero, email, telefono)
        res.status(201).json({
            message: 'USUARIO REGISTRADO SATISFACTORIAMENTE',
            success: true,
            user: newUser
        })

    } catch (error) {
        res.status(500).json({
            message: 'INTERNAL SERVER ERROR',
            success: false
        })
    }
}

const updateUser = async (req, res) => {
    const { id, nickname, nombre, paterno, materno, nacimiento, genero, email, telefono} = req.body

    try {
        const userUpdated = await User.updateUser ( id, nickname, nombre, paterno, materno, nacimiento, genero, email, telefono)
        res.json({
            userUpdated,
            message: 'success'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = { login, signUp, user, updateUser }