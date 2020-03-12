import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    token: null
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.saveToken : return {
            ...state,
            isLoggedIn: true,
            token: action.token
        }
        case actionTypes.autoLogin : return {
            ...state,
            isLoggedIn: true,
            token: action.token
        }
        case actionTypes.authLogout : return {
            ...state,
            isLoggedIn: false,
            token: null
        }
        default:
            return state;
    }
};

export default reducer;