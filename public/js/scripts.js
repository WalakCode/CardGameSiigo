window.addEventListener('popstate', (event) => {
    const state = event.state;
    if (state) {
      // Puedes utilizar el estado para tomar decisiones basadas en la entrada del historial
      
      console.log('Se ha navegado hacia atrás o adelante en el historial:', state);
    }
  });
  