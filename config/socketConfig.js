const io = require('../app'); // Importar io desde app.js

io.on('connection', () => {
    console.log('Un cliente se ha conectado');
    // Define tus eventos y lógica personalizada aquí
  });




