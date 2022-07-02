const serverStore = require('../serverStore');
const roomsUpdates = require('./updates/rooms');

const roomJoinHandler = async (socket, data) => {
    const {roomId} = data;

    const participantDetails = {
        userId: socket.user.userId,
        socketId: socket.id
    };

    serverStore.joinActiveRoom(roomId, participantDetails);

    // send info to users in room that they should prepare for incoming connection
    const roomDetails = serverStore.getActiveRoom(roomId);
    roomDetails.participants.forEach((participant) => {
        if (participant.socketId !== participantDetails.socketId){
            socket.to(participant.socketId).emit('conn-prepare', {
                connUserSocketId: participantDetails.socketId
            });
        }
    });

    await roomsUpdates.updateRooms();
}

module.exports = roomJoinHandler;
