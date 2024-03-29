import store from "../store/store";
import {setActiveRooms, setIsUserJoinedOnlyWithAudio, setLocalStream, setOpenRoom, setRemoteStreams, setRoomDetails, setScreenSharingStream} from "../store/actions/roomActions";
import * as socketConnection from './socketConnection';
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () => {
    const successCallbackFunc = () => {
        store.dispatch(setOpenRoom(true, true));
        // only audio track:
        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
        socketConnection.createNewRoom();
    };

    const audioOnly = store.getState().room.audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
}

export const newRoomCreated = (data) => {
    const {roomDetails} = data;
    store.dispatch(setRoomDetails(roomDetails));
}

export const updateActiveRooms = (data) => {
    const {activeRooms} = data;

    const friends = store.getState().friends.friends;
    const rooms = [];

    const userId = store.getState().auth.userDetails?._id;

    // filter rooms by friends:
    activeRooms.forEach((room) => {
        const isRoomCreatedByMe = room.roomCreator.userId === userId;

        if (isRoomCreatedByMe) {
            // allow to rejoin own room:
            rooms.push({...room, creatorUsername: 'Me'});
        } else {
            // friends rooms:
            friends.forEach((friend) => {
                if (friend.id === room.roomCreator.userId) {
                    rooms.push({...room, creatorUsername: friend.username});
                }
            })
        }
    })

    store.dispatch(setActiveRooms(rooms));
}

export const joinRoom = (roomId) => {
    const successCallbackFunc = () => {
        store.dispatch(setRoomDetails({roomId}));
        store.dispatch(setOpenRoom(false, true));
        // only audio track:
        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
        socketConnection.joinRoom({roomId});
    }

    const audioOnly = store.getState().room.audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
}

export const leaveRoom = () => {
    const roomId = store.getState().room.roomDetails.roomId;

    // disconnect local stream:
    const localStream = store.getState().room.localStream;
    if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        store.dispatch(setLocalStream(null));
    }

    const screenSharingStream = store.getState().room.screenSharingStream;
    if (screenSharingStream) {
        screenSharingStream.getTracks().forEach((track) => track.stop());
        store.dispatch(setScreenSharingStream(null));
    }

    store.dispatch(setRemoteStreams([]));
    webRTCHandler.closeAllConnections();

    socketConnection.leaveRoom({roomId});
    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false));
}
