//importando paquetes
const express = require('express'); //pidiendo express
const { createServer } = require('node:http');
const dbconexion = require('./config/config'); //creando la conexion
const session = require('express-session'); 
const controladorUsuario = require('./controllers/userController'); //pidiendo un controlador
const controladorSala = require('./controllers/roomControler'); //pidiendo un controlador
const cache = require('./cache')
const { Server } = require("socket.io");

//creando instancias
const app = express(); //instanciando express
const server = createServer(app);//instanciando HTTP
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(session({
  secret:'NFAUOFPI02MC0',
  resave: false,
  saveUninitialized: true,
  cookie:{secure:false},  
}));

app.use(express.urlencoded({ extended: true }));

//conectando a base de datos
dbconexion.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
    // escuchando en el puerto 3000
    server.listen(3000, () => {
        console.log('server on');
    })
  });


//desabilitando x-powered-by (header HTTP) para seguridad
app.disable('x-powered-by');

//seleccionando ruta de elementos estaticos 
app.use(express.static('public'));

//configurando motor de vistas
app.set('view engine', 'ejs');



//configuracion socket io



//ruta principal
app.get('/', (req, res) => {
    let error = req.session.error;
    req.session.destroy() 
    res.render('index',{ error });
  })

//registrarse
app.post('/', (req, res) => {

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

app.get('/login',(req,res)=>{
  let error = req.session.dato;
  req.session.destroy() 
  res.render('login',{error});
})

//logearse
app.get('/create-room',(req,res)=>{
    if(req.session.usuario){
      let user = req.session.usuario
      res.render('create-room',{ user })
    }else{
      res.redirect('login');
    }
   
  }),

app.post('/create-room',(req,res)=>{
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


app.get('/generatecode',(req,res)=>{
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

app.get('/room-create',(req,res)=>{
  if(req.session.usuario){
    let user = req.session.usuario;
    res.render('room',{ user })
  }else{
    res.redirect('login')
  }
})

app.post('/room-create',(req,res)=>{
  const roomname = req.body.nameroom
  const roomcode = req.body.coderoom

  controladorSala.crearSala((err)=>{
    if(err){
      res.render('error')
    }else{
      let usuario = cache.cacheUsuario();
      console.log(usuario)
      req.session.usuario = usuario;
      res.redirect('room-create')
    }
  })
})


module.exports = io;









