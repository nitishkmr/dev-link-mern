import { combineReducers } from 'redux';    //used to combine more than one reducers like reducer for alert, loggedin etc
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
    /*to be combined here*/
    alert,
    auth,
    profile
});
