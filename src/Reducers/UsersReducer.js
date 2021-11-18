import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP } from "../Actions/AuthActions";
import { CHANGE_ANSWER, SAVE_QUESTION_ANSWER } from "../Actions/QuestionsActions";
import { GET_USERS, GET_AUTHUSER } from "../Actions/UserActions";

const InitialState = {
    users: {},
    AuthUser: "",
    isAuth: false,
};
export default function UsersReducer(state = InitialState, { type, payload }) {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload,
            };
        case GET_AUTHUSER:
            return {
                ...state,
                AuthUser: payload ? payload : "",
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                AuthUser: payload,
                isAuth: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuth: false,
                AuthUser: "",
            };
        case SIGNUP:
            const { username, FirstName, LastName } = payload;
            const name = FirstName + LastName;
            return {
                ...state,
                users: {
                    ...state.users,
                    [username]: {
                        id: username,
                        name: name,
                        avatarURL: "",
                        answers: {},
                        questions: [],
                    },
                },
            };
        case SAVE_QUESTION_ANSWER:
        case CHANGE_ANSWER:
            const { qid, answer, authedUser } = payload
            return {
                ...state,
                users: {
                    ...state.users,
                    [authedUser]: {
                        ...state.users[authedUser],
                        answers: {
                            ...state.users[authedUser].answers,
                            [qid]: answer
                        }
                    }
                }
            }
        default:
            return state;
    }
}

