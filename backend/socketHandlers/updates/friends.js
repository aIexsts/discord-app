const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');
const User = require('../../models/user');

const updateFriendsPendingInvitations = async (userId) => {
    try {
        const receiverList = serverStore.getUserActiveConnections(userId);
        if (receiverList.length === 0) {
            return;
        }

        const pendingInvitations = await FriendInvitation.find({
            receiverId: userId
        }).populate('senderId', '_id username email'); // to object

        emitEventToUserDevices(userId, receiverList, 'friends-invitations', {
            pendingInvitations: pendingInvitations ? pendingInvitations : []
        });
    } catch (err) {
        console.log(err);
    }
}

const updateFriends = async (userId) => {
    try {
        const receiverList = serverStore.getUserActiveConnections(userId);
        if (receiverList.length === 0) {
            return;
        }

        const user = await User.findById(userId, {_id: 1, friends: 1}).populate(
            'friends',
            '_id username email'
        );

        if (user && user.friends.length > 0) {
            const friendsList = user.friends.map(f => {
                return {
                    id: f._id,
                    email: f.email,
                    username: f.username
                }
            });

            emitEventToUserDevices(userId, receiverList, 'friends-list', {
                friends: friendsList ? friendsList : []
            });
        }
    } catch (err) {
        console.log(err);
    }
}

const emitEventToUserDevices = (userId, receiverList, eventName, eventBody) => {
    // find all active connections of specific userId
    const io = serverStore.getSocketServerInstance();

    // user can have multiple socket connections - one per each device type(PC, Phone, Browser)
    receiverList.forEach(receiverSocketId => {
        // emit event:
        io.to(receiverSocketId).emit(eventName, eventBody);
    });
}

module.exports = {
    updateFriendsPendingInvitations,
    updateFriends
}
