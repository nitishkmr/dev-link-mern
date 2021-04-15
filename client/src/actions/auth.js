import axios from 'axios';
import { setAlert } from './alert';     // for errors like enter name, email etc
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './types';
import setAuthToken from '../utils/setAuthToken';

//FOR INFO ABOUT ACTIONS in general, open /actions/alert


//Load User
export const loadUser = () => async dispatch => {
    // check if there is already a token in localStorage
    // if there is, then sent in the header x-auth-token via file: /util/setAuthToken.js -> TO SET GLOBAL HEADERS
    // hit /api/auth in every protected request to check if the user is loggedin
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');   //axios.defaults.headers.common will set global header (in setAuthToken.js)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }

}

//Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        header: {    //The Content-Type header is just used as info for the application.The browser doesn't care what it is
            // It just signifies what is being sent so we can made our code to work accordingly
            'Content-Type': 'application/json'
        }
    }

    const body = { name, email, password };     // and not JSON.stringify({name, email, password})

    try {
        // console.log("--------------------------");
        const res = await axios.post('/api/users', body, config);
        // console.log(res);
        // console.log("--------------------------");
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {

        const errors = err.response.data.errors;       // from the backend, we'll get an array of errors (if any)
        console.log(errors);
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
};


//Login User
export const login = (email, password) => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    const body = { email, password };     // and not JSON.stringify({name, email, password})

    try {
        // console.log("--------------------------");
        const res = await axios.post('/api/auth', body, config);
        // console.log(res.data.token);
        // console.log(res.data);
        // console.log("--------------------------");
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {

        const errors = err.response.data.errors;       // from the backend, we'll get an array of errors (if any)
        console.log(errors);
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
};


//Logout / Clear Profile
// export const logout = () => dispatch => {
//     dispatch({
//         type: LOGOUT
//     });
// }

export function logout() {
    return (dispatch) => {
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: LOGOUT });
    }
}