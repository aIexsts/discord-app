const serverStore =  require('../serverStore');

const disconnectHandler = async(socket, io) => {
    serverStore.removeConnectedUser(socket.id);
}

module.exports = disconnectHandler;