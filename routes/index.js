//importando paquetes
const express = require('express'); //pidiendo express
const router = express.Router(); //pidiendo el router de express
const controladorUsuario = require('../controllers/userController'); //pidiendo un controlador
const controladorSala = require('../controllers/roomControler'); //pidiendo un controlador
const cache = require('../cache')


//ruta principal
router.get('/', (req, res) => {
    let error = req.session.error;
    req.session.destroy() 
    res.render('index',{ error });
  })

//registrarse
router.post('/', (req, res) => {

const usuario = req.body.nickname; 
const contraseña = req.body.password;

controladorUsuario.verificarUsuario(usuario,contraseña,(err,error)=>{
 if(err){
  console.error('error al verificarla',err);
 }
 else if(error){
    req.session.error = error
    res.redirect('/')
 }else{
  console.log('to fue bien')
  
  controladorUsuario.crearUsuarios(usuario, contraseña, (err) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      res.render('error');
    } else {
        cache.borrarCacheUsuario()
        cache.cacheUsuario(usuario)
        req.session.usuario = usuario;
        res.redirect('create-room')
    }
  });
 }
})
})

router.get('/login',(req,res)=>{
  let error = req.session.dato;
  req.session.destroy() 
  res.render('login',{error});
})

//logearse
router.get('/create-room',(req,res)=>{
    if(req.session.usuario){
      let user = req.session.usuario
      res.render('create-room',{ user })
    }else{
      res.redirect('login');
    }
   
  }),

router.post('/create-room',(req,res)=>{
  const usuario = req.body.nickname; 
  const contraseña = req.body.password;
  
controladorUsuario.iniciarSesion(usuario,contraseña,(err,autenticando,error)=>{
  if (err) {
    res.render('error');
  } else{
    if(autenticando){
      cache.borrarCacheUsuario()
      cache.cacheUsuario(usuario)
      req.session.usuario = usuario;
      res.redirect('create-room');  
    }else{
      req.session.dato = error
      res.redirect('login')
    }
  }
})
}),


router.get('/generatecode',(req,res)=>{
  controladorSala.crearCodigoSala((err,respuesta)=>{
    if(err){
      res.render('error');
    }else{
      if(respuesta){
        res.json({codigo:respuesta});
      }
    }
  })
}),



router.get('/room-create',(req,res)=>{
  if(req.session.usuario){
    let user = req.session.usuario;
    res.render('room',{ user })
  }else{
    res.redirect('login')
  }
})

router.post('/room-create',(req,res)=>{
  const roomname = req.body.nameroom
  const roomcode = req.body.coderoom

  controladorSala.crearSala((err)=>{
    if(err){
      res.render('error')
    }else{
      let usuario = cache.cacheUsuario();
      req.session.usuario = usuario;
      res.redirect('room-create')
    }
  })
})

//exporta modulo router
module.exports = router;
