import * as Api from "../DATA";

export const GET_USERS = "GET_USERS";
export const GET_AUTHUSER = "GET_AUTHUSER";

function GetUsers(users) {
  return {
    type: GET_USERS,
    payload: users,
  };
}
export function GetAuthUser(user) {
  return {
    type: GET_AUTHUSER,
    payload: user,
  };
}
export function GettingAllUsers() {
  return (dispatch) => {
    Api._getUsers().then((users) => dispatch(GetUsers(users)));
  };
}
