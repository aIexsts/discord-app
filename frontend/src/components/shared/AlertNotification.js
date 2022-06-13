import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { getAlertActions } from '../../store/actions/alertActions';
import { connect } from 'react-redux';

const AlertNotification = ({
    showAlertMessage,
    closeAlertMessage,
    alertMessageContent
}) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={showAlertMessage}
            onClose={closeAlertMessage}
        //  autoHideDuration={6000}
        >
            <Alert severity='info'>{alertMessageContent}</Alert>
        </Snackbar>
    );
}

const mapStateToProps = ({alert}) => {
    return {
        ... alert
    };
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getAlertActions(dispatch)
    };
};

// connect(state, actions)
export default connect(mapStateToProps, mapActionsToProps)(AlertNotification);