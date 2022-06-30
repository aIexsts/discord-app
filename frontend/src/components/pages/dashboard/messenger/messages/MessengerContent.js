import React, {useEffect} from 'react';
import {styled} from "@mui/system";
import NewMessageInput from "./NewMessageInput";
import Messages from "./Messages";
import {getDirectChatHistory} from "../../../../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
    flexGrow: 1
});

const MessengerContent = ({chosenChatDetails}) => {
    useEffect(() => {
        getDirectChatHistory({
            receiverUserId: chosenChatDetails.id
        })
    }, [chosenChatDetails]);

    return (
        <Wrapper>
            <Messages/>
            <NewMessageInput/>
        </Wrapper>
    );
};

export default MessengerContent;
