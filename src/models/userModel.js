const con = require('../config/mysql')
const IUser = require('../interfaces/IUser')
const bcrypt = require('bcrypt')

class User extends IUser {
    constructor( id, nickname, nombre, paterno, materno, nacimiento, password, genero, correo, telefono) {
        super()
        this.id = id
        this.nickname = nickname
        this.nombre = nombre
        this.paterno = paterno
        this.materno = materno
        this.nacimiento = nacimiento
        this.password = password
        this.genero = genero
        this.correo = correo
        this.telefono = telefono
    }

    static async createUser (nickname, nombre, paterno, materno, nacimiento, password, genero, correo, telefono) {
        try {
            const hash = await bcrypt.hash(password, 10)
            const query = 'INSERT INTO `usuario` ' +
            '(usu_nickname, usu_nombre, usu_paterno, usu_materno, usu_nacimiento, usu_password, usu_genero, usu_correo, usu_telefono) ' + 
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        
        await con.query(query, [
            nickname,
            nombre,
            paterno,
            materno,
            nacimiento,
            hash,
            genero,
            correo,
            telefono
        ])

        return new User(nickname, nombre, paterno, materno, nacimiento, password, genero, correo, telefono)

        }
        catch (err) {
            console.log('ERROR =>', err)
            throw new Error('ERROR AL REGISTRAR AL NUEVO USUARIO')
        }
    }

    static async verifiyPassword (password, passwordBD) {
        return await bcrypt.compare(password, passwordBD)
    } 

    static async findUser (email) {
        try {
            const query = 'SELECT * FROM usuarios WHERE usu_email = ?'
            const userDoc = await con.query(query, [email])

                if (userDoc.length > 0) {
                    const newUser = new User (
                        userDoc[0].user_id,
                        userDoc[0].user_nickname,
                        userDoc[0].user_nombre,
                        userDoc[0].user_paterno,
                        userDoc[0].user_materno,
                        userDoc[0].user_nacimiento,
                        userDoc[0].user_password,
                        userDoc[0].user_genero,
                        userDoc[0].user_correo,
                        userDoc[0].user_telefono
                    )
                    return newUser
                }
                return null
        }
        catch(err) {
            console.log('Error => ', err)
            throw new Error('NO SE ENCONTRO AL USUARIO')
        }
    }

    
}