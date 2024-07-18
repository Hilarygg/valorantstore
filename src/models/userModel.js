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
}