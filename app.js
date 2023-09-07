//importando paquetes
const express = require('express'); //pidiendo express
const http = require('http'); // pidiendo el modulo HTTP
const socketIo = require('socket.io');
const dbconexion = require('./config/config'); //creando la conexion
const router = require('./routes/index');
const session = require('express-session');

//creando instancias
const app = express(); //instanciando express
const server = http.createServer(app);//instanciando HTTP

const io = socketIo(server);



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

//redireccionando gestion de rutas
app.use('/',router);


module.exports = io;










