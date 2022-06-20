import React, { useState } from 'react';
import { Tooltip, Typography } from '@mui/material';
import Avatar from '../../../../shared/Avatar';
import { Box } from '@mui/system';
import InvitationDecisionButtons from './InvitationDecisionButtons';

const PendingInvitationsListItem = ({
    id,
    username,
    email,
    acceptFriendInvitation = () => { },
    rejectFriendInvitation = () => { }
}) => {

    const [buttonDisabled, setButtonsDisabled] = useState(false);

    const handleAcceptInvitation = () => {
        acceptFriendInvitation({ id });
        setButtonsDisabled(true);
    };

    const handleRejectInvitation = () => {
        rejectFriendInvitation({ id });
        setButtonsDisabled(false);
    };

    return (
        <Tooltip title={email}>
            <div style={{ width: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '42px',
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Avatar username={username} />
                    <Typography
                        sx={{
                            marginLeft: '7px',
                            fontWeight: 700,
                            color: '#8E9297',
                            flexGrow: 1
                        }}
                        variant='subtitle1'
                    >{username}</Typography>
                    <InvitationDecisionButtons
                        disabled={buttonDisabled}
                        acceptInvitationHandler={handleAcceptInvitation}
                        rejectInvitationHandler={handleRejectInvitation}
                    />
                </Box>
            </div>
        </Tooltip>
    );
}

export default PendingInvitationsListItem;