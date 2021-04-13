import axios from 'axios';
import { setAlert } from './alert';     // for errors like enter name, email etc
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//FOR INFO ABOUT ACTIONS in general, open /actions/alert

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
    } catch (err) {
        
        const errors = err.response.data.errors;       // from the backend, we'll get an array of errors (if any)
        console.log(errors);
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}