const Conversation = require('../../models/conversation');
const serverStore = require('../../serverStore');

const notifyChatHistory = async (
    conversationId,
    toSpecifiedSocketId = null
) => {
    const conversation = await Conversation.findById(conversationId).populate({
        path: 'messages',
        model: 'Message',
        populate: {
            path: 'author',
            model: 'User',
            select: 'username _id'
        }
    });

    if (conversation) {
        const io = serverStore.getSocketServerInstance();

        // just publish messages to one user socket:
        if (toSpecifiedSocketId) {
            // initial update of chat history
            return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
                messages: conversation.messages,
                participants: conversation.participants
            });
        } else {
            // notify online chat participants !!!!!
            conversation.participants.forEach(userId => {
                const userActiveConnections = serverStore.getUserActiveConnections(userId.toString());
                // online user connections:
                userActiveConnections.forEach(socketId => {
                    io.to(socketId).emit('direct-chat-history', {
                        messages: conversation.messages,
                        participants: conversation.participants
                    });
                });
            });
        }
    }
}

module.exports = {notifyChatHistory};
