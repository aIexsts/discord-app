import {composeWithDevTools} from 'redux-devtools-extension';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer';
import friendsReducer from './reducers/friendsReducer';
import chatReducer from './reducers/chatReducer';
import roomReducer from "./reducers/roomReducer";

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    friends: friendsReducer,
    chat: chatReducer,
    room: roomReducer
});

const store = createStore(
    reducers,  
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
