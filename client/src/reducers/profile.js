// actions to get the profile, create, update the profile and the state
import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    // NO_REPOS
} from '../actions/types';

const initialState = {
    profile: null,  // when logged in, a req will be made and the user's profile data will get stored
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:    // #### since the profile would've been changed in the backend when we made
            // made the axios req in action, here reducer will change the store on the client side acc.
            return {
                ...state,
                profile: action.payload,
                loading: false
            };

        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };

        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                profile: null
            };

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: []
            };

        case GET_REPOS:
            return{
                ...state,
                repos: action.payload,
                loading: false
            }

        default:
            return state;
    }

};

export default profileReducer;