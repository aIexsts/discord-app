import React, { useEffect, useState } from 'react';
import AuthBox from '../../../shared/AuthBox';
import LoginPageFooter from './LoginPageFooter';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import { validateLoginForm } from '../../../../utils/validators';
import { getAuthActions } from '../../../../store/actions/authActions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({login}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(validateLoginForm({ email, password }))
    }, [email, password, setIsFormValid])

    const handleLogin = () => {
        const userDetails = {
            email,
            password
        }
        login(userDetails, navigate);
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

const mapActionsToProps = (dispatch) => {
    return {
        ...getAuthActions(dispatch)
    };
};

// connect(state, actions)
export default connect(null, mapActionsToProps)(LoginPage);