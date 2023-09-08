const express = require('express'); //pidiendo express
const http = require('http'); // pidiendo el modulo HTTP
const socketIo = require('socket.io');
const dbconexion = require('./config/config'); //creando la conexion
const session = require('express-session');

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
  
  //desabilitando x-powered-by (header HTTP) para seguridad
  app.disable('x-powered-by');
  
  //seleccionando ruta de elementos estaticos 
  app.use(express.static('public'));
  
  //configurando motor de vistas
  app.set('view engine', 'ejs');

module.exports = io;