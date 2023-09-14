const userCache = {
    user:"",

    cacheUsuario:(usuario)=>{   
    let user = usuario
      if(user){
        userCache.user = user
      }else{
        let usuarioG = userCache.user
        return usuarioG
      }
    },
    borrarCacheUsuario:()=>{
        userCache.user = ""
    }
}

module.exports = userCache;
