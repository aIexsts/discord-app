const roomSignalingDataHandler = async (socket, data) => {
    const {connUserSocketId, signal} = data;

    // retransmit the same event?
    const signalingData = {signal, connUserSocketId: socket.id};
    socket.to(connUserSocketId).emit('conn-signal', signalingData);
}

module.exports = roomSignalingDataHandler;

