//importacion
const dbconexion = require('../config');//pide conexion y configuracion de la base de datos

//modelo de usuario
const modeloUsuario = {

    //funcion de crear usuarios
    crearUsuario:(nuevoUsuario, callback) =>{
        const query = 'INSERT INTO usuarios SET ?';//query SQL
        //se envia el query nuevo usuario ya creado en el controlador
        dbconexion.query(query,nuevoUsuario,(err)=>{
            if (err){
                return callback(err);//si da error manda error
            }
            return callback(null);//si no, no manda nada
        });
    },


    obtenerUsuarioPorNombre:(usuarioIngresado,callback)=>{
        const query = 'SELECT * FROM usuarios WHERE usuario = ?';
        dbconexion.query(query,usuarioIngresado,(err,results)=>{
            if(err){
                return callback(err,null)
            }
            console.log("se saco iformacion")
            return callback(null,results);
        })
    }
 }


//se exporta el modulo
module.exports = modeloUsuario;




