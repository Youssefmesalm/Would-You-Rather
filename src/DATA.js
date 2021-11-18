import ym from "./Images/ym.jpg";
import tyler from "./Images/tyler.jpg";
import zoz from "./Images/zoz.jpg";
import sarah from "./Images/sarah.jpg";
let users = {
    sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: sarah,
        answers: {
            "8xf0y6ziyjabvozdd253nd": "0",
            "6ni6ok3ym7mf1p33lnez": "0",
            am8ehyc8byjqgar0jgpub9: "1",
            loxhs1bqm25b708cmbf3g: "1",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    },
    tylermcginnis: {
        id: "tylermcginnis",
        name: "Tyler McGinnis",
        avatarURL: tyler,
        answers: {
            vthrdm985a262al8qx3do: "0",
            xj352vofupe1dqz9emx13r: "1",
        },
        questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
    },
    johndoe: {
        id: "johndoe",
        name: "John Doe",
        avatarURL: zoz,
        answers: {
            xj352vofupe1dqz9emx13r: "0",
            vthrdm985a262al8qx3do: "1",
            "6ni6ok3ym7mf1p33lnez": "1",
        },
        questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
    },
    YouSuf: {
        id: "Yousuf",
        name: "Yousuf Mesalm",
        avatarURL: ym,
        answers: {},
        questions: [],
    },
};

let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        question: "Which is you prefer?",
        answers: {
            0: {
                votes: ["sarahedo"],
                text: "have horrible short term memory",
            },
            1: {
                votes: [],
                text: "have horrible long term memory",
            },
        },
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: "6ni6ok3ym7mf1p33lnez",
        author: "johndoe",
        timestamp: 1468479767190,
        question: "What would you rather?",
        answers: {
            0: {
                votes: [],
                text: "become a superhero",
            },
            1: {
                votes: ["johndoe", "sarahedo"],
                text: "become a supervillian",
            },
        },
    },
    am8ehyc8byjqgar0jgpub9: {
        id: "am8ehyc8byjqgar0jgpub9",
        author: "sarahedo",
        timestamp: 1488579767190,
        question: "Which would you love to be?",
        answers: {
            0: {
                votes: [],
                text: "be telekinetic",
            },
            1: {
                votes: ["sarahedo"],
                text: "be telepathic",
            },
        },
    },
    loxhs1bqm25b708cmbf3g: {
        id: "loxhs1bqm25b708cmbf3g",
        author: "tylermcginnis",
        timestamp: 1482579767190,
        question: "Which career you like to be?",
        answers: {
            0: {
                votes: [],
                text: "be a front-end developer",
            },
            1: {
                votes: ["sarahedo"],
                text: "be a back-end developer",
            },
        },
    },
    vthrdm985a262al8qx3do: {
        id: "vthrdm985a262al8qx3do",
        author: "tylermcginnis",
        timestamp: 1489579767190,
        question: "Which is good to you?",
        answers: {
            0: {
                votes: ["tylermcginnis"],
                text: "find $50 yourself",
            },
            1: {
                votes: ["johndoe"],
                text: "have your best friend find $500",
            },
        },
    },
    xj352vofupe1dqz9emx13r: {
        id: "xj352vofupe1dqz9emx13r",
        author: "johndoe",
        timestamp: 1493579767190,
        question: "What language do you love to write?",
        answers: {
            0: {
                votes: ["johndoe"],
                text: "write JavaScript",
            },
            1: {
                votes: ["tylermcginnis"],
                text: "write Swift",
            },
        },
    },
};

function generateUID() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

export function _getUsers() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...users }), 1000);
    });
}

export function _getQuestions() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...questions }), 1000);
    });
}

function formatQuestion({ answers, question, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        question,
        answers: answers
    };
}

export function _saveQuestion(question) {
    return new Promise((res, rej) => {
        const authedUser = question.author;
        const formattedQuestion = formatQuestion(question);

        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion,
            };

            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions: users[authedUser].questions.concat([formattedQuestion.id]),
                },
            };

            res(formattedQuestion);
        }, 1000);
    });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers: {
                        ...users[authedUser].answers,
                        [qid]: answer,
                    },
                },
            };

            questions = {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    answers: {
                        ...questions[qid].answers,
                        [answer]: {
                            ...questions[qid].answers[answer],
                            votes: questions[qid].answers[answer].votes.concat([authedUser]),
                        }
                    },
                },
            };

            res();
        }, 500);
    });
}
