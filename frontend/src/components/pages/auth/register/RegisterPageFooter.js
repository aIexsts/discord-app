import React from 'react';
import CustomPrimaryButton from '../../../shared/CustomPrimaryButton';
import RedirectInfo from '../../../shared/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const getFormNotValidMessage = () => {
    return 'Username should contain between 3 and 12 characters and password should should contain between 6 and 12 character. Also correct email address shold be provided.';
}

const getFormValidMessage = () => {
    return 'Press to register';
}

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {

    const navigate = useNavigate();

    const handlePushToRegisterPage = () => {
        navigate('/login');
    }
    return (
        <>
            <Tooltip
                title={isFormValid ?  getFormValidMessage(): getFormNotValidMessage()}
            >
                <div>
                    <CustomPrimaryButton
                        label='Register'
                        additionalStyles={{
                            marginTop: '30px'
                        }}
                        disabled={!isFormValid}
                        onClick={handleRegister}
                    />
                </div>
            </Tooltip>
            <RedirectInfo
                text=''
                redirectText='Already have an account ? '
                additionalStyles={{ marginTop: '5px' }}
                redirectHandler={handlePushToRegisterPage}
            />
        </>
    );
}

export default RegisterPageFooter;