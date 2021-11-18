export function formatUser(user) {
    const { id, name, avatarURL, answers, questions } = user;
    const AC = Object.keys(answers).length;
    const QC = questions.length
    return {
        id,
        name,
        avatar: avatarURL,
        answers,
        answersCount: AC,
        questionCount: QC,
        score: AC + QC
    };
}

export function formatQuestion(Question, user) {
    const { timestamp, answers, question } = Question;
    let votes = 0;
    Object.keys(answers).map((answer) => (votes = votes + answers[answer].votes.length));

    const { name, avatarURL } = user;
    return {
        timestamp,
        author: name,
        avatar: avatarURL,
        question,
        answers,
        votes: votes,
    };
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
