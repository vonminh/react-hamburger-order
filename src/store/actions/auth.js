import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error.message
    }
}

export const asynAuth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const sumitData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        const API_KEY = process.env.API_KEY;
        const METHOD = isSignup ? 'signupNewUser' : 'verifyPassword';
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${METHOD}?key=${API_KEY}`, sumitData)
            .then(res => {
                dispatch(authSuccess(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err));
            })
    }
}
