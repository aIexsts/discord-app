import React from 'react';
import {styled} from "@mui/system";
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";
import {connect} from "react-redux";
import {getRoomActions} from "../../../../../store/actions/roomActions";

const MainContainer = styled('div')({
    height: '17%',
    width: '100%',
    backgroundColor: '#5865F2',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const RoomButtons = (props) => {
    const {localStream, isUserJoinedOnlyWithAudio} = props;

    return (
        <MainContainer>
            {!isUserJoinedOnlyWithAudio && <ScreenShareButton {...props}/>}
            <MicButton localStream={localStream}/>
            <CloseRoomButton/>
            {!isUserJoinedOnlyWithAudio && <CameraButton localStream={localStream}/>}
        </MainContainer>
    );
};

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getRoomActions(dispatch)
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButtons);
