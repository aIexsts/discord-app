const Message = require('../models/message');
const Conversation = require('../models/conversation');
const chatUpdates = require('../socketHandlers/updates/chat');

const directMessageHandler = async (socket, data) => {
    try {
        console.log('direct message event is being handled');

        const {userId} = socket.user;
        const {receiverUserId, content} = data;

        // create new message
        const message = await Message.create({
            content: content,
            author: userId,
            date: new Date(),
            type: 'DIRECT'
        })

        // check if two users already have conversation, if not create new
        const conversation = await Conversation.findOne({
            participants: {$all: [userId, receiverUserId]}
        });

        if (conversation) {
            conversation.messages.push(message._id);
            await conversation.save();

            // perform and update to sender and receiver if is online
            await chatUpdates.notifyChatHistory(conversation._id.toString())
        } else {
            // create new conversation if not exists
            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId, receiverUserId]
            })

            // perform and update to sender and receiver if is online
            await chatUpdates.notifyChatHistory(newConversation._id.toString())
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = directMessageHandler;
