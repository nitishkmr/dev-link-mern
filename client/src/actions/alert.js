import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuid } from 'uuid';

// action doesn't do anything, just signifies the reducer(via store and dispatching) about the action being performed
// from the types.js file like SET_ALERT etc -> sends the type and payload and rest is done by reducer (changing the state etc)

// WRT Thunk
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid();
    dispatch(
        {
            type: SET_ALERT,
            payload: {
                msg: msg,
                alertType: alertType,
                id: id
            }
        }
    );

    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), 3000);
};

// Below is the normal Action Creator -> only JS objects, above one will use thunk.. for async also

// export function setAlert(msg, alertType) {
//     const id = uuid();
//     return {
//         type: SET_ALERT,
//         payload: {
//             msg: msg,
//             alertType: alertType,
//             id: id
//         }
//     }
// }