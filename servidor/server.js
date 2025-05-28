const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);

    let parsed;
    try {
      parsed = JSON.parse(message); // Intenta parsear el JSON
    } catch (err) {
      console.error("Mensaje inválido (no es JSON):", message.toString());
      return; // No reenvíes si no es JSON válido
    }

    const broadcast = JSON.stringify(parsed); // Serializa el objeto una sola vez

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(broadcast);
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

console.log('Servidor levantado');
