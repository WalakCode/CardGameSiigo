const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { error } = require('console');



const controladorSala = {

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

    crearSala:(sala,codigo,callback)=>{  
      if(sala,codigo){
        return callback(null)
      }else{
        const error = "ingrese todos los datos"
        return callback(error)
      }
    }
}

module.exports = controladorSala;