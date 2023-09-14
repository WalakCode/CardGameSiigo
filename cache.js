const userCache = {
    user:"",
    codigoSala:"",
    nombreSala:"",

    cacheSala:(nombreS,codigoS)=>{
    if(nombreS,codigoS){
      userCache.codigoSala = codigoS,
      userCache.nombreSala = nombreS
    }else{
      const result = {
        codigo:userCache.codigoSala,
        nombre:userCache.nombreSala
      }
      return result
    }
    },
    cacheUsuario:(usuario)=>{   
      if(usuario){
        userCache.user = usuario
      }else{
        let usuarioG = userCache.user
        return usuarioG
      }
    },
    borrarCacheUsuario:()=>{
        userCache.user = ""
    },
    borrarCacheSala:()=>{
      userCache.codigoSala ="",
      userCache.nombreSala =""
    }
}

module.exports = userCache;
