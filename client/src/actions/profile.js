import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    // GET_PROFILES,
    // UPDATE_PROFILE,
    // CLEAR_PROFILE,
    // ACCOUNT_DELETED,
    // GET_REPOS,
    // NO_REPOS
} from './types';


//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    // connect to /api/profile/me with the current token
    try {
        const res = await axios.get('/api/profile/me');     // in header the token will always sent (using setAuthToken.js)
        dispatch(
            {
                type: GET_PROFILE,
                payload: res.data
            }
        );
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Create or update profile (based on edit)
export const createProfile = (formData, history, edit = false) => async dispatch => {
    // console.log("CREATEPROFILE ACTION")
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // const res = await axios.post('/api/profile', formData);
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {
            //kind of redirect only, just we cannot do it from action so this is used and it can be used using 'withRouter' in CreateProfile.js
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

