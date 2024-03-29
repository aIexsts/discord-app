import React from 'react';
import {styled} from '@mui/system';
import MainPageButton from './MainPageButton';
import CreateRoomButton from "./CreateRoomButton";
import {connect} from "react-redux";
import ActiveRoomButton from "./ActiveRoomButton";

const MainContainer = styled('div')({
    width: '72px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#202225'
});

const SideBar = ({activeRooms, isUserInRoom}) => {
    return (
        <MainContainer>
            <MainPageButton/>
            <CreateRoomButton isUserInRoom={isUserInRoom}/>
            {activeRooms?.map((room) => {
                return <ActiveRoomButton
                    key={room.roomId}
                    roomId={room.roomId}
                    isUserInRoom={isUserInRoom}
                    creatorUsername={room.creatorUsername}
                    amountOfParticipants={room.participants.length}
                />
            })}
        </MainContainer>
    );
}

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    };
};

export default connect(mapStoreStateToProps)(SideBar);
