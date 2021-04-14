// regarding auth so have to be connected to backend also

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),      // to store the token sent from the backend
    isAuthenticated: null,                  // when logged in, it'll be true so Navbar, icons etc can change acc to it
    loading: true,                 // when data is received from the backend, then loading = false
    user: null                  // to store the user data (name, email, avatar, etc) received from the backend
}

//reducer takes (init state, action that has been dispatched)
function authReducer(state = initialState, action) {
    // console.log("REDUCER CALLED")
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:  // => we get the token back, so want to make user logged in
            localStorage.setItem('token', action.payload.token);
            // console.log("LOGIN REDUCER CALLED")
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,      // modifying new values for isAuth and loading
                loading: false
            }
        // break;

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            // console.log("LOGOUT/REMOVE TOKEN REDUCER CALLED");
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,      // modifying new values for isAuth and loading
                loading: false
            }
        // break;

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        // break;

        default: return state;
        // break;
    }
};

export default authReducer;