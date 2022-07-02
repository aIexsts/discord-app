const serverStore = require('../serverStore');
const roomsUpdates = require('./updates/rooms');

const roomCreateHandler = async(socket) => {
    console.log('handling room create event');
    const socketId = socket.id;
    const userId = socket.user.userId;

    const roomDetails = serverStore.addNewActiveRoom(userId, socketId);

    socket.emit('room-create', {
        roomDetails
    });

    await roomsUpdates.updateRooms();
}

module.exports = roomCreateHandler;
