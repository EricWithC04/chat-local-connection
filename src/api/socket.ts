import { NextApiRequest } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponseServerIO } from '@/types/next';

// let peers = []; // Lista de peers conectados en la red LAN

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if (!res.socket.server.io) {
        console.log('Inicializando Socket.IO...');
        const io = new SocketIOServer(res.socket.server);

        // Configurar los eventos de Socket.IO
        io.on('connection', (socket) => {
            console.log(`Cliente conectado: ${socket.id}`);

            // Manejar recepción de mensajes
            socket.on('chat message', (msg) => {
                console.log(`Mensaje recibido: ${msg}`);
                io.emit('chat message', msg); // Retransmitir mensaje
            });

            // Manejar desconexiones
            socket.on('disconnect', () => {
                console.log(`Cliente desconectado: ${socket.id}`);
            });
        });

        res.socket.server.io = io;
    }

    res.end();
}