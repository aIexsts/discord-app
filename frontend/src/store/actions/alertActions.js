import * as api from '../../utils/api'

export const alertActions = {
    OPEN_ALERT_MESSAGE: 'ALERT.OPEN_ALERT_MESSAGE',
    CLOSE_ALERT_MESSAGE: 'ALERT.CLOSE_ALERT_MESSAGE'
};

export const getAlertActions = (dispatch) => {
    return {
        openAlertMessage: (content) => dispatch (openAlertMessage(content)),
        closeAlertMessage: () => dispatch (closeAlertMessage())
    }
}

export const openAlertMessage = (content) => {
    return {
        type: alertActions.OPEN_ALERT_MESSAGE,
        content
    }
}

export const closeAlertMessage = () => {
    return {
        type: alertActions.CLOSE_ALERT_MESSAGE
    }
}