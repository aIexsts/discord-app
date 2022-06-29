const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const authSocket = require('./middleware/authSocket');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const serverStore = require('./serverStore');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    serverStore.setSocketServerInstance(io);

    // middleware to authorise user:
    io.use((socket, next) => {
        authSocket(socket, next);
    });

    // on successfully connected
    io.on('connection', (socket) => {
        console.log('user connected:', socket.id);
        // connection handlers:
        newConnectionHandler(socket, io);
        emitOnlineUsers();
        socket.on('disconnect', () => {
            console.log('user disconnected:', socket.id);
            disconnectHandler(socket);
        });
    })

    // online users
    const emitOnlineUsers = () => {
        const onlineUsers = serverStore.getOnlineUsers();
        io.emit('online-users', {onlineUsers});
    }

    setInterval(() => {
        emitOnlineUsers()
    }, 8000);
}

module.exports = {
    registerSocketServer
};
