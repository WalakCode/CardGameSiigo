const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const io = require('../app')



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

    crearSala:(callback)=>{   
      console.log("si funciono")
      return callback(null)

    }
}

module.exports = controladorSala;