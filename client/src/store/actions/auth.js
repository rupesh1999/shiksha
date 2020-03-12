import * as actionTypes from "./actionTypes";

export const saveToken = (token) => {

    return {
        type: actionTypes.saveToken,
        token: token,
    };
};

const autoLogger = () => {
    return {
        type: actionTypes.autoLogin,
        token: window.localStorage.getItem("token")
    }
}

const checkAuthTimeout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time);
    }
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    return {
        type: actionTypes.authLogout
    }
}

export const tryAutoLogin = () => {
    return dispatch => {
        console.log("autologin");
        const expirationDate = new Date(localStorage.getItem('expiresIn'));
        if (window.localStorage.getItem("token") !== null && expirationDate >= new Date()) {
            dispatch(autoLogger());
            dispatch(checkAuthTimeout(expirationDate - new Date()));
        } else {
            dispatch(logout())
        }
    }
};