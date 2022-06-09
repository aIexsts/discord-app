import {composeWithDevTools} from 'redux-devtools-extension';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

const reducers = combineReducers({
    auth: authReducer
});

const store = createStore(
    reducers,  
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;