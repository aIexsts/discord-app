import React, {useEffect} from 'react';
import {styled} from '@mui/system';
import SideBar from './sidebar/SideBar';
import FriendsSideBar from './friendsSidebar/FriendsSideBar';
import AppBar from './appbar/AppBar';
import Messenger from './messenger/Messenger';
import {logout, isTokenValid} from '../../../utils/auth';
import {connect} from 'react-redux';
import {getAuthActions} from '../../../store/actions/authActions';
import {connectWithSocketServer} from '../../../realtimeCommunication/socketConnection';
import Room from "./room/Room";

const Wrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex'
});

const Dashboard = ({setUserDetails, isUserInRoom}) => {

    useEffect(() => {
        const userDetails = localStorage.getItem('user');
        if (!userDetails || !isTokenValid(userDetails)) {
            logout();
        } else {
            setUserDetails(JSON.parse(userDetails));
            connectWithSocketServer(JSON.parse(userDetails));
        }
    }, []);

    return (
        <Wrapper>
            <SideBar/>
            <FriendsSideBar/>
            <Messenger/>
            <AppBar/>
            {isUserInRoom && <Room/>}
        </Wrapper>
    );
}

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getAuthActions(dispatch)
    };
};

// connect(state, actions)
export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
