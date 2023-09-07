//importacion
const dbconexion = require('../config');//pide conexion y configuracion de la base de datos

//modelo de usuario
const modeloUsuario = {

    crearUsuario:(nuevoUsuario, callback) =>{
        const query = 'INSERT INTO usuarios SET ?';
        dbconexion.query(query,nuevoUsuario,(err)=>{
            if (err){
                return callback(err);
            }
            return callback(null);
        });
    },


    obtenerUsuarioPorNombre:(usuarioIngresado,callback)=>{
        const query = 'SELECT * FROM usuarios WHERE usuario = ?';
        dbconexion.query(query,usuarioIngresado,(err,results)=>{
            if(err){
                return callback(err,null)
            }
            return callback(null,results);
        })
    }
 }


//se exporta el modulo
module.exports = modeloUsuario;




