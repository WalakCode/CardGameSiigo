//importando paquetes
const express = require('express'); //pidiendo express
const router = express.Router(); //pidiendo el router de express
const controladorUsuario = require('../controllers/userController'); //pidiendo un controlador
const authMiddleware = require('../middlewares/auth')




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

controladorUsuario.verificarUsuario(usuario,(err,error)=>{
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


router.get('/create-room',(req,res)=>{
    if(req.session.usuario){
      let user = req.session.usuario
      res.render('create-room',{ user })
    }else{
      res.redirect('login');
    }
   
  }),


//logearse
router.post('/create-room',(req,res)=>{
  const usuario = req.body.nickname; 
  const contraseña = req.body.password;
  
controladorUsuario.iniciarSesion(usuario,contraseña,(err,autenticando,error)=>{
  if (err) {
    res.render('error');
  } else{
    if(autenticando){
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
  controladorUsuario.crearCodigoSala((err,respuesta)=>{
    if(err){
      res.render('error');
    }else{
      if(respuesta){
        res.json({codigo:respuesta});
      }
    }
  })
}),






//exporta modulo router
module.exports = router;
