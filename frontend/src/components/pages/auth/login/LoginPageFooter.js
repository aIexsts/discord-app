import React from 'react';
import CustomPrimaryButton from '../../../shared/CustomPrimaryButton';
import RedirectInfo from '../../../shared/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const getFormNotValidMessage = () => {
    return 'Enter correct email address and password';
}

const getFormValidMessage = () => {
    return 'Press to log in';
}

const LoginPageFooter = ({ handleLogin, isFormValid }) => {

    const navigate = useNavigate();

    const handlePushToRegisterPage = () => {
        navigate('/register');
    }
    return (
        <>
            <Tooltip
                title={isFormValid ?  getFormValidMessage(): getFormNotValidMessage()}
            >
                <div>
                    <CustomPrimaryButton
                        label='Log in'
                        additionalStyles={{
                            marginTop: '30px'
                        }}
                        disabled={!isFormValid}
                        onClick={handleLogin}
                    />
                </div>
            </Tooltip>
            <RedirectInfo
                text='Need an account? '
                redirectText='Create an account'
                additionalStyles={{ marginTop: '5px' }}
                redirectHandler={handlePushToRegisterPage}
            />
        </>
    );
}

export default LoginPageFooter;