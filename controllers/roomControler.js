const UserModel = require('../model/userModel');//pidiendo el modelo de usuario
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const io = require('../config/socketConfig');
const { callbackify } = require('util');

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
        
    }
}

module.exports = controladorSala;