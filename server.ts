import { createServer } from 'http'
import next from 'next'
import { Server } from 'socket.io'
// const bonjour = require('bonjour');

// Configuración de Next.js
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const PORT = 3000;

// Inicialización del servidor
app.prepare().then(() => {
    const server = createServer((req, res) => {
        handle(req, res);
    });

    // Inicializar Socket.IO
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);

        socket.on('chat message', (msg) => {
            console.log(`Mensaje recibido: ${msg}`);
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });

    // Anunciar el servidor usando Bonjour
    //   const bonjourService = bonjour();
    //   bonjourService.publish({ name: 'chat-node', type: 'http', port: PORT });

    server.listen(PORT, () => {
        console.log(`> Servidor listo en http://localhost:${PORT}`);
    });
});