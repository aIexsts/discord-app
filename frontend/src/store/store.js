import {composeWithDevTools} from 'redux-devtools-extension';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer';

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer
});

const store = createStore(
    reducers,  
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;