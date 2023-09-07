
//importa modulos
const UserModel = require('../model/userModel');//pidiendo el modelo de usuario
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { resourceUsage } = require('process');


//controlador de usuario
const controladorUsuario = {
  
    crearUsuarios:(usuario,contraseña,callback) =>{
        const nuevoUsuario ={ 
            usuario: usuario,
            contraseña: contraseña, 
        };
        UserModel.crearUsuario(nuevoUsuario,(err) =>{
            if(err){
              console.error('error en la consulta:', err);
              return callback(err);
            }
            return callback(null)

        })  
    },

    verificarUsuario:(usuario,callback)=>{
      UserModel.obtenerUsuarioPorNombre(usuario,(err,results)=>{
        if(err){
          console.error('error en la consulta de usuario',err)
          return(callback(err,null))
        }
        if(results.length !== 0){
          let error = 'usuario ya existe en la base de datos'
          console.log(error)
          return callback(null,error)
        }else{
          console.log('no existe el user')
          return callback(null,null)
        }
      })
    },



    iniciarSesion: (usuario, contraseña, callback) => {
        UserModel.obtenerUsuarioPorNombre(usuario,(err, results) => {
          if (err) {
            console.error('Error en la consulta de usuario por nombre:', err);
            return callback(err,null);
          }
          if (results.length === 0) {
            let error = "usuario no encontrado";
            return callback(null, false,error); 
          }

          const usuarioEncontrado = results[0];
          const contraseñaAlmacenada = usuarioEncontrado.contraseña;

          if (contraseñaAlmacenada === contraseña) {
            console.log('todo exito');
            return callback(null, true); 
          } else {
            let error = "no coincide contraseñas";
            return callback(null,false,error);
            }
        });
      },


      crearCodigoSala:(callback)=>{
          const miUUID = uuidv4();
          const hash = crypto.createHash('sha256').update(miUUID).digest('hex')
          const hashCorto = hash.slice(0,8)
          if(hashCorto){
            return callback(null,hashCorto)
          }else{
            console.log("no existe el hash")
            return callback(null)
          }
          

      },
      
      
}

//exporta el modulo
module.exports = controladorUsuario;
