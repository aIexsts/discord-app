import React from 'react';
import {Button, Tooltip} from "@mui/material";
import Avatar from "../../../shared/Avatar";
import {joinRoom} from "../../../../realtimeCommunication/roomHandler";

const MAX_ROOM_PARTICIPANTS = 4;

const ActiveRoomButton = ({
                              creatorUsername,
                              roomId,
                              amountOfParticipants,
                              isUserInRoom
                          }) => {

    const handleJoinActiveRoom = () => {
        if (amountOfParticipants < MAX_ROOM_PARTICIPANTS) {
            joinRoom(roomId);
        }
    };

    const activeRoomButtonDisabled = amountOfParticipants >= MAX_ROOM_PARTICIPANTS;
    const roomTitle = `Creator: ${creatorUsername}. Connected: ${amountOfParticipants}`;


    return (
        <Tooltip title={roomTitle}>
            <div>
                <Button
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '16px',
                        margin: 0,
                        padding: 0,
                        minWidth: 0,
                        marginTop: '10px',
                        color: 'white',
                        backgroundColor: '#5865F2'
                    }}
                    disabled={activeRoomButtonDisabled || isUserInRoom}
                    onClick={handleJoinActiveRoom}
                >
                    <Avatar username={creatorUsername}/>
                </Button>
            </div>

        </Tooltip>
    );
};

export default ActiveRoomButton;
