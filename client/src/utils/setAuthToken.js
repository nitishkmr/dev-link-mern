// to add a Global header
import axios from 'axios';

const setAuthToken = token => {
    if(token){
        // if token is there in localStorage
        axios.defaults.headers.common['x-auth-token'] = token;  // Attaches Authorization header for all axios requests
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken; 