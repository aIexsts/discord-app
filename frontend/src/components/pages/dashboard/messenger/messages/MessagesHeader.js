import React from 'react';
import {styled} from "@mui/system";
import Avatar from "../../../../shared/Avatar";
import {Typography} from "@mui/material";

const MainContainer = styled("div")({
    width: '98%',
    display: 'column',
    marginTop: '10px'
});

const MessagesHeader = ({name = ''}) => {
    return (
        <MainContainer>
            <Avatar large username={name}/>
            <Typography
                variant={'h4'}
                sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    marginLeft: '5px',
                    marginRight: '5px'
                }}
            >
                {name}
            </Typography>
            <Typography
                sx={{
                    color: '#B9BBBE',
                    marginLeft: '5px',
                    marginRight: '5px'
                }}
            >
                This is the beginning of your conversation with {name}
            </Typography>
        </MainContainer>
    );
};

export default MessagesHeader;
