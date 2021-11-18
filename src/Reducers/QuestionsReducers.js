import { CHANFE_LIST_MODE, CHANGE_ANSWER, CLOSE_DIALOG, CLOSE_LOGIN_FORM, GET_ALL_QUESTIONS,  HIDE_ANSWER, OPEN_DIALOG, OPEN_LOGIN_FORM, SAVE_QUESTION_ANSWER, SELECT_QUESTION, SET_ANSWERD_LIST, SET_UNANSWERD_LIST, UPDATE_ANSWERD } from "../Actions/QuestionsActions";

const initiastate = {
    questions: {},
    Mode: "All",
    OpenLogin: false,
    AnswerdQuestions: [],
    UnAnswerdQuestions: [],
    selectedQuestion: {},
    openDialog: false,
    showAnswer: false
};
export default function QuestionsReducers(
    state = initiastate,
    { type, payload }
) {
    switch (type) {
        case GET_ALL_QUESTIONS:
            return {
                ...state,
                questions: payload,
            };
        case SELECT_QUESTION:
            return {
                ...state,
                showAnswer: true,
                selectedQuestion: {
                    answers: payload.answers,
                    question: payload.question,
                    avatar: payload.avatar,
                    author: payload.author,
                    questionid: payload.questionid
                }
            }
        case HIDE_ANSWER:
            return {
                ...state,
                showAnswer: payload
            }
        case OPEN_LOGIN_FORM:
            return {
                ...state,
                OpenLogin: payload
            }
        case CLOSE_LOGIN_FORM:
            return {
                ...state,
                OpenLogin: payload
            }
        case CLOSE_DIALOG:
            return {
                ...state,
                openDialog: payload,
            }
        case OPEN_DIALOG:
            return {
                ...state,
                openDialog: payload,
            }
        case SET_ANSWERD_LIST:
            return {
                ...state,
                AnswerdQuestions: payload
            }
        case UPDATE_ANSWERD:
            return {
                ...state,
                AnswerdQuestions: [...state.AnswerdQuestions, payload]
            }
        case SET_UNANSWERD_LIST:
            return {
                ...state,
                UnAnswerdQuestions: payload
            }
        case CHANFE_LIST_MODE:
            return {
                ...state,
                Mode: payload,
            }
        case SAVE_QUESTION_ANSWER:
            var { qid, answer, authedUser } = payload
            return {
                ...state,
                AnswerdQuestions: state.AnswerdQuestions.includes(qid) ? [...state.AnswerdQuestions] : [...state.AnswerdQuestions, qid],
                UnAnswerdQuestions: state.UnAnswerdQuestions.filter((a) => a !== qid),
                selectedQuestion: handleAddAnswer(state.selectedQuestion, answer, authedUser),
                questions: {
                    ...state.questions,
                    [qid]: handleAddAnswer(state.questions[qid], answer, authedUser)
                },
            }
        case CHANGE_ANSWER:
            var { qid, answer, authedUser, oldAnswerd } = payload
            return {
                ...state,
                selectedQuestion:
                    handlechangeanswer(state.selectedQuestion, answer, authedUser, oldAnswerd),

                questions: {
                    ...state.questions,
                    [qid]: handlechangeanswer(state.questions[qid], answer, authedUser, oldAnswerd)
                }
            }
        default:
            return state;

    }
}

function handleAddAnswer(state, answer, authedUser) {
    return {
        ...state,
        answers: {
            ...state.answers,
            [answer]: {
                ...state.answers[answer],
                votes: state.answers[answer].votes.includes(authedUser) === false ? [...state.answers[answer].votes, authedUser] : [...state.answers[answer].votes]
            }
        }

    }
}
function handlechangeanswer(state, answer, authedUser, oldAnswerd) {
    return {
        ...state,
        answers: {
            ...state.answers,
            [answer]: {
                ...state.answers[answer],
                votes: state.answers[answer].votes.includes(authedUser) === false ? [...state.answers[answer].votes, authedUser]
                    : [...state.answers[answer].votes]
            },
            [oldAnswerd]: {
                ...state.answers[oldAnswerd],
                votes: state.answers[oldAnswerd].votes.filter((v) => v !== authedUser)
            },
        }

    }
}
