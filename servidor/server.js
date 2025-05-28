const http = require('http');
const WebSocket = require('ws');

// Creamos el servidor HTTP base
const server = http.createServer();

// Creamos el WebSocket sobre una ruta específica
const wss = new WebSocket.Server({ server, path: "/ws" });

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (message) => {
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

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar el servidor en el puerto 8080
server.listen(8080, () => {
  console.log("Servidor WebSocket escuchando en ws://localhost:8080/ws");
});
