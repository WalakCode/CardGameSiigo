const UserModel = require('../model/userModel');//pidiendo el modelo de usuario

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

    verificarUsuario:(usuario,contraseña,callback)=>{
      if(usuario && contraseña){
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
      }else{
        let error = 'ingrese todos los datos'
        return callback(null,error)
      }
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
  
}

//exporta el modulo
module.exports = controladorUsuario;
