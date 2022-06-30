import store from "../store/store";
import {setMessages} from "../store/actions/chatActions";

export const updateDirectChatHistoryIfActive = (data) => {
    const {participants, messages} = data;

    // find id of user from token and id from active conversation
    const receiverId = store.getState().chat.chosenChatDetails?.id;
    const userId = store.getState().auth.userDetails._id;

    if (receiverId && userId) {
        const usersInActiveChatConversation = [receiverId, userId];
        updateDirectChatHistoryIfSameConversationActive({
            participants,
            usersInConversation: usersInActiveChatConversation,
            messages
        });
    }
}

// Update only active chat!!!
const updateDirectChatHistoryIfSameConversationActive = ({
        participants,
        usersInConversation,
        messages
}) => {
    const activeChatUsersMatchWithUpdatedChatEvent = participants.every((participantId) => {
        return usersInConversation.includes(participantId);
    });

    if (activeChatUsersMatchWithUpdatedChatEvent) {
        store.dispatch(setMessages(messages));
    }
}
