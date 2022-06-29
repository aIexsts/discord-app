import React, { useEffect, useState } from 'react';
import CustomPrimaryButton from '../../../shared/CustomPrimaryButton';
import { isEmailValid } from '../../../../utils/validators';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import InputWithLabel from '../../../shared/InputWithLabel';
import { connect } from 'react-redux';
import { getFriendsActions } from '../../../../store/actions/friendsActions';

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation = () => { }
}) => {
    const [email, setEmail] = useState('');
    const [isFormValid, setIsFormValid] = useState('');

    const handleSendInvitation = () => {
        sendFriendInvitation({
            targetEmailAddress: email
        }, handleCloseDialog);
    };

    const handleCloseDialog = () => {
        closeDialogHandler();
        setEmail('');
    };

    useEffect(() => {
        setIsFormValid(isEmailValid(email));
    }, [email, setIsFormValid]);

    return (
        <>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography>Invite a Friend</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Enter email address of friend which you would like to invite
                        </Typography>
                        <InputWithLabel
                            label='Email'
                            type='text'
                            value={email}
                            setValue={setEmail}
                            placeholder='Enter email address'
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CustomPrimaryButton
                        onClick={handleSendInvitation}
                        disabled={!isFormValid}
                        label='Send'
                        additionalStyles={{
                            marginLeft: '15px',
                            marginRight: '15px',
                            marginBottom: '10px'
                        }}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getFriendsActions(dispatch)
    };
};

export default connect(null, mapActionsToProps)(AddFriendDialog);