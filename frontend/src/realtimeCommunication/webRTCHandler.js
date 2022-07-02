import store from "../store/store";
import {setLocalStream, setRemoteStreams} from "../store/actions/roomActions";
import * as socketConnection from './socketConnection';
import Peer from "simple-peer";

const audioOnlyConstraints = {
    audio: true,
    video: false
};

const defaultConstraints = {
    video: true,
    audio: true
}

const getConfiguration = () => {
    const turnIceServers = null;

    if (turnIceServers) {
        // TODO use TURN server credentials
    } else {
        console.log('Using only STUN server');
        return {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        }
    }
}

export const getLocalStreamPreview = (audioOnly = false, callbackFunc) => {
    const constraints = audioOnly ? audioOnlyConstraints : defaultConstraints;

    // open stream connection:
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        store.dispatch(setLocalStream(stream));
        callbackFunc();
    }).catch(err => {
        console.log(err);
        console.log('Cannot get an access to local stream');
    });
}

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const localStream = store.getState().room.localStream;

    if (isInitiator) {
        console.log('preparing new peer connection as initiator');
    } else {
        console.log('preparing new peer connection as not initiator');
    }

    // PEERS !!!
    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        stream: localStream
    });

    peers[connUserSocketId].on('signal', data => {
        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId
        };

        // pass signaling data to other user
        socketConnection.signalPeerData(signalData);
    });

    peers[connUserSocketId].on('stream', (remoteStream) => {
        // add new remote stream to our sever store
        console.log('remote stream came from server');
        console.log('direct connection has been established');
        remoteStream.connUserSocketId = connUserSocketId;
        addNewRemoteStream(remoteStream);
    });
};

export const handleSignalingData = (data) => {
    const {connUserSocketId, signal} = data;

    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }
};

const addNewRemoteStream = (remoteStream) => {
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];
    store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
    Object.entries(peers).forEach((mappedObject) => {
        const connUserSocketId = mappedObject[0];
        if (peers[connUserSocketId]) {
            peers[connUserSocketId].destroy();
            delete peers[connUserSocketId];
        }
    })
};

export const handleParticipantLeftRoom = (data) => {
    const {connUserSocketId} = data;

    if (peers[connUserSocketId]) {
        peers[connUserSocketId].destroy();
        delete peers[connUserSocketId];
    }

    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = remoteStreams.filter(
        (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
    );

    store.dispatch(setRemoteStreams(newRemoteStreams));
}

export const switchOutgoingTracks = (stream) => {
    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
                if (
                    peers[socket_id].streams[0].getTracks()[index].kind ===
                    stream.getTracks()[index2].kind
                ) {
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }
        }
    }
}
