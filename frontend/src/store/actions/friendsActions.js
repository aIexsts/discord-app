import { alignProperty } from "@mui/material/styles/cssUtils"
import * as api from '../../utils/api'
import { openAlertMessage } from "./alertActions"

export const friendsActions = {
    SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
    SET_PENDING_FRIENDS_INVITATIONS: 'FRIENDS.SET_PENDING_FRIENDS_INVITATIONS',
    SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS'
}

export const getFriendsActions = (dispatch) => {
    return {
        sendFriendInvitation: (data, closeDialogHandler) => dispatch(sendFriendInvitation(data, closeDialogHandler)),
        acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
        rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data))
    }
}

export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
    return {
        type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
        pendingFriendsInvitations
    }
}

export const setFriends = (friends) => {
    return {
        type: friendsActions.SET_FRIENDS,
        friends
    }
}

export const setOnlineUsers = (onlineUsers) => {
    return {
        type: friendsActions.SET_ONLINE_USERS,
        onlineUsers
    }
}

export const acceptFriendInvitation = (data) => {
    return async (dispatch) => {
        const response = await api.acceptFriendInvitation(data);
        if (response.error) {
            dispatch(openAlertMessage(response.exception?.response?.data));
        } else {
            dispatch(openAlertMessage('Invitatation accepted!'));
        }
    }
}

export const rejectFriendInvitation = (data) => {
    return async (dispatch) => {
        const response = await api.rejectFriendInvitation(data);

        if (response.error) {
            dispatch(openAlertMessage(response.exception?.response?.data));
        } else {
            dispatch(openAlertMessage('Invitation rejected!'));
        }
    }
}

const sendFriendInvitation = (data, closeDialogHandler) => {
    return async (dispatch) => {
        const response = await api.sendFriendInvitation(data);

        if (response.error) {
            dispatch(openAlertMessage(response.exception?.response?.data));
        } else {
            dispatch(openAlertMessage('Invitatation has been sent!'));
            closeDialogHandler();
        }
    }
}
