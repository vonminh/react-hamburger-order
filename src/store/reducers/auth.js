import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    authInfos : {
        tokenId: null,
        userId: null
    },
    error: null,
    loading: false,
    isSignup: true
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return updateObject(state, { loading: true });

        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                authInfos: {
                    tokenId: action.tokenId,
                    userId: action.userId
                },
                error: null,
                loading: false
            })

        case actionTypes.AUTH_FAIL:
            return updateObject(state, { error: action.error, loading: false })
        
        default:
            return state;
    }
}

export default authReducer;
