import React, { useEffect, useState } from 'react';
import AuthBox from '../../../shared/AuthBox';
import LoginPageFooter from './LoginPageFooter';
import LoginPageHeader from './LoginPageHeader'
import LoginPageInputs from './LoginPageInputs'
import {validateLoginForm} from '../../../../utils/validators'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(validateLoginForm({email, password}))
    }, [email, password, setIsFormValid])

    const handleLogin = () => {
        console.log('Login in');
    };

    return (
        <AuthBox>
            <LoginPageHeader />
            <LoginPageInputs
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
            <LoginPageFooter
                isFormValid={isFormValid}
                handleLogin={handleLogin}
            />
        </AuthBox>
    );
}

export default LoginPage;