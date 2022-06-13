import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import AuthBox from '../../../shared/AuthBox';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';
import {validateRegisterForm} from '../../../../utils/validators'
import { getAuthActions } from '../../../../store/actions/authActions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({register}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(validateRegisterForm({
            email, 
            username, 
            password
        }))
    }, [email, username, password, setIsFormValid])

    const handleRegister = () => {
        const userDetails = {
            email,
            username,
            password
        }
        register(userDetails, navigate);
    };

    return (
        <AuthBox>
            <Typography variant='h5' sx={{ color: 'white' }}>
                Create an account
            </Typography>
            <RegisterPageInputs
                email={email}
                setEmail={setEmail}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />
            <RegisterPageFooter
                handleRegister={handleRegister}
                isFormValid={isFormValid}
            />
        </AuthBox>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getAuthActions(dispatch)
    };
};

// connect(state, actions)
export default connect(null, mapActionsToProps)(RegisterPage);