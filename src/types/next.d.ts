import { Server as NetServer } from 'http';
import { Socket } from 'net';
import { Server as SocketIOServer } from 'socket.io';

interface SocketServer extends NetServer {
    io?: SocketIOServer;
}

interface SocketWithServer extends Socket {
    server: SocketServer;
}

export interface NextApiResponseServerIO extends NextApiResponse {
    socket: SocketWithServer;
    end: () => void;
}