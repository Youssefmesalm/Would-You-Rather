
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SIGNUP = "SIGNUP";


export function Login(Authuser) {
    return {
        type: LOGIN_SUCCESS,
        payload: Authuser,
    };
}
export function Logout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

export function Signup({ username, FirstName, LastName }) {
    return {
        type: SIGNUP,
        payload: { username, FirstName, LastName },
    };
}
