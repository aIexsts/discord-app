const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const authSocket = require('./middleware/authSocket');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const roomCreateHandler = require('./socketHandlers/roomCreateHandler');
const serverStore = require('./serverStore');
const roomJoinHandler = require("./socketHandlers/roomJoinHandler");
const roomLeaveHandler = require("./socketHandlers/roomLeaveHandler");
const roomInitializeConnectionHandler = require("./socketHandlers/roomInitializeConnectionHandler");
const roomSignalingDataHandler = require("./socketHandlers/roomSignalingDataHandler");

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

        socket.on('direct-message', (data) => {
            directMessageHandler(socket, data);
        });

        socket.on('direct-chat-history', (data) => {
            directChatHistoryHandler(socket, data);
        });

        socket.on('room-create', (_) => {
            roomCreateHandler(socket);
        });

        socket.on('room-join', (data) => {
            roomJoinHandler(socket, data);
        });

        socket.on('room-leave', (data) => {
            roomLeaveHandler(socket, data);
        });

        socket.on('conn-init', (data) => {
            roomInitializeConnectionHandler(socket, data);
        });

        socket.on('conn-signal', (data) => {
            roomSignalingDataHandler(socket, data);
        });

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
