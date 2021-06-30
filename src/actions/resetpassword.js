import {toast} from 'react-toastify';

export const RESETPASSWORD_REQUEST = 'RESETPASSWORD_REQUEST';
export const RESETPASSWORD_SUCCESS = 'RESETPASSWORD_SUCCESS';
export const RESETPASSWORD_FAILURE = 'RESETPASSWORD_FAILURE';

export function receiveResetPassword() {
    return {
        type: RESETPASSWORD_SUCCESS
    };
}

export function resetPasswordError(payload) {
    return {
        type: RESETPASSWORD_FAILURE,
        payload,
    };
}

export function sendPasswordResetEmail(payload) {
    return (dispatch) => {
        if (payload.creds.email.length > 0) {
            toast.success("Email Sent Successfully");
            payload.history.push('/login');
        } else {
            dispatch(resetPasswordError('Something was wrong. Try again'));
        }
    }
}
