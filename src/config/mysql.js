const mysql = require('mysql');
const {promisify} = require('util');

//Configurar coneccion a la base de datos

const conection = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'password564',
        database: 'valorant'
    }
)

conection.getConnection ((err, conn) => {
    if(err)
        console.log('ERROR AL CONECTAR LA BD => ', err)

    if(conn)
        console.log('DB CONECTADA')

    return
})

conection.query = promisify(conection.query)

module.exports = conection