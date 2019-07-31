import { combineReducers } from 'redux';
import authModule from './authModule';
import errorModule from './errorModule';

export default combineReducers({
    auth: authModule,
    errors: errorModule
});