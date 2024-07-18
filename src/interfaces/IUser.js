class IUser {
    static async createUser (nickname, nombre, paterno, materno, nacimiento, genero, correo, telefono) {}
    static async updateUser (id, nickname, nombre, paterno, materno, nacimiento, genero, correo, telefono) {}
    static async findUser (nickname) {}
    static async verifiyPassword (password) {}
}

module.exports = IUser