import { RESETPASSWORD_FAILURE, RESETPASSWORD_REQUEST, RESETPASSWORD_SUCCESS } from '../actions/resetpassword';

export default function resetPassword(state = {
    isFetching: false,
    errorMessage: ''
}, action) {
    switch (action.type) {
        case RESETPASSWORD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RESETPASSWORD_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: '',
            });
        case RESETPASSWORD_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload,
            });
        default:
            return state;
    }
}
