const Conversation = require('../models/conversation');
const chatEvents = require('../socketHandlers/updates/chat');

const directChatHistoryHandler = async (socket, data) => {
    try {
        const {userId} = socket.user;
        const {receiverUserId} = data;

        const conversation = await Conversation.findOne({
            participants: {$all: [userId, receiverUserId]},
            type: 'DIRECT'
        });

        if (conversation) {
            // just emit event for one user?
            await chatEvents.notifyChatHistory(conversation._id.toString(), socket.id)
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = directChatHistoryHandler;
