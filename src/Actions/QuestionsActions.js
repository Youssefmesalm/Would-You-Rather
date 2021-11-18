import * as Api from "../DATA";
export const GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS";
export const SELECT_QUESTION = "SELECT_QUESTION";
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const SET_ANSWERD_LIST = 'SET_ANSWERD_LIST';
export const SET_UNANSWERD_LIST = 'SET_UNANSWERD_LIST';
export const CHANFE_LIST_MODE = 'CHANFE_LIST_MODE';
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"
export const UPDATE_ANSWERD = 'UPDATE_ANSWERD'
export const OPEN_LOGIN_FORM = 'OPEN_LOGIN_FORM'
export const CLOSE_LOGIN_FORM = 'CLOSE_LOGIN_FORM'
export const CHANGE_ANSWER = 'CHANGE_ANSWER'
export const HIDE_ANSWER = 'HIDE_ANSWER'

export function Hide_Answer() {
    return {
        type: HIDE_ANSWER,
        payload: false
    }
}
export function ChangeAnswer(answer) {
    return {
        type: CHANGE_ANSWER,
        payload: answer
    }
}
export function Close_Login_form() {
    return {
        type: CLOSE_LOGIN_FORM,
        payload: false
    }
}
export function Open_Login_form() {
    return {
        type: OPEN_LOGIN_FORM,
        payload: true
    }
}
export function update_answerd(qid) {
    return {
        type: UPDATE_ANSWERD,
        payload: qid
    }
}

export function Save_Question_Answer(answer) {
    return {
        type: SAVE_QUESTION_ANSWER,
        payload: answer
    }

}
export function Handle_Save_Answer(answer) {
    return (dispatch) => {
        dispatch(Save_Question_Answer(answer))
        Api._saveQuestionAnswer(answer)
    }
}
export function Select_Question(question, questionid, author, avatar, answers) {
    return {
        type: SELECT_QUESTION,
        payload: {
            question, questionid, avatar, answers, author
        },
    };
}
export function Change_List(mode) {
    return {
        type: CHANFE_LIST_MODE,
        payload: mode,
    }
}

export function Close_Dialog() {
    return {
        type: CLOSE_DIALOG,
        payload: false
    }
}
export function Open_Dialog() {
    return {

        type: OPEN_DIALOG,
        payload: true
    }
}
export function GetAllQuestions(questions) {
    return {
        type: GET_ALL_QUESTIONS,
        payload: questions,
    };
}
export function GetQuestions() {
    return (dispatch) => {
        Api._getQuestions().then((questions) => {
            dispatch(GetAllQuestions(questions))

        })
    };
}

export function Save_Question(question) {
    return {
        type: SAVE_QUESTION,
        payload: question
    }
}

export function HandleSetNewQuestion(question) {
    return (dispatch) => {
        Api._saveQuestion(question)
            .then(() => {
                dispatch(GetQuestions())
                dispatch(Close_Dialog())
            })

            .catch((err) =>
                console.log(err)
            )

    }
}
export function Fillunanswerdlist(list) {
    return {
        type: SET_UNANSWERD_LIST,
        payload: list,
    }
}

export function Fillanswerdlist(list) {
    return {
        type: SET_ANSWERD_LIST,
        payload: list,
    }
}
