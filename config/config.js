const mysql = require('mysql') //requiere mysql 

//crea la configuracion de la base de datos
const db = {
    host: 'localhost',  
    user: 'root',
    password: '',
    database: 'cardgame',
  };

//crear conexion
const dbconexion = mysql.createConnection(db);

//exportar configuracion y conexion
module.exports = dbconexion;

