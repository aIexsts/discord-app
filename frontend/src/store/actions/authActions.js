import * as api from '../../utils/api'
import { openAlertMessage } from './alertActions';

export const authActions = {
    SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS'
};

export const getAuthActions = (dispatch) => {
    return {
        login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
        register: (userDetails, navigate) => dispatch(register(userDetails, navigate))
    }
}

const login = (userData, navigate) => {
    // only possible with redux thunk!!
    return async (dispatch) => {
        const response = await api.login(userData);
        if (response.error) {
            dispatch(openAlertMessage(response?.exception?.response?.data));
            return;
        }

        const { userDetails } = response?.data;
        localStorage.setItem('user', JSON.stringify(userDetails));

        dispatch(setUserDetails(userDetails));
        navigate('/dashboard')
    }
}

const register = (userData, navigate) => {
    // only possible with redux thunk!!
    return async (dispatch) => {
        const response = await api.register(userData);
        if (response.error) {
            dispatch(openAlertMessage(response?.exception?.response?.data));
            return;
        }

        const { userDetails } = response?.data;
        localStorage.setItem('user', JSON.stringify(userDetails));

        dispatch(setUserDetails(userDetails));
        navigate('/dashboard')
    }
}

const setUserDetails = (userDetails) => {
    return {
        type: authActions.SET_USER_DETAILS,
        userDetails
    }
}