const { io } = require ('../app');

io.on('connection', (socket) => {
    console.log('Cliente conectado');
  
    // Maneja eventos personalizados aquí
    socket.on('mensaje', (mensaje) => {
      console.log(`Mensaje recibido: ${mensaje}`);
      // Puedes hacer lo que quieras con el mensaje, como emitirlo a otros clientes, procesarlo, etc.
      io.emit('mensaje', mensaje); // Emitir el mensaje a todos los clientes conectados
    });
  
    // Maneja desconexiones
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
  