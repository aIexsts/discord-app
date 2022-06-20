import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import SideBar from './sidebar/SideBar';
import FriendsSideBar from './friendsSidebar/FriendsSideBar';
import AppBar from './appbar/AppBar';
import Messenger from './messenger/Messenger';
import { logout } from '../../../utils/auth';
import { connect } from 'react-redux';
import { getAuthActions } from '../../../store/actions/authActions';

const Wrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex'
});

const Dashboard = ({ setUserDetails }) => {

    useEffect(() => {
        const userDetails = localStorage.getItem('user');
        if (!userDetails) {
            logout();
        } else {
            setUserDetails(JSON.parse(userDetails));
        }
    }, [setUserDetails]);

    return (
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
        </Wrapper>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getAuthActions(dispatch)
    };
};

// connect(state, actions)
export default connect(null, mapActionsToProps)(Dashboard);