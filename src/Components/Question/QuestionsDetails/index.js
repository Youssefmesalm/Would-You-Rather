import { Avatar, Container, Link, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link as LinkRouter } from 'react-router-dom'
import { formatQuestion } from '../../../Utilitis/Helper'
import Answer from '../Answer/AnswerOption'

export const QuestionDetails = ({ questionid, totalAnswers, next, prev, question: { author, avatar, answers, question } }) => {

    return (
        <Container maxWidth={totalAnswers >= 4 ? "lg" : "md"}>
            <Stack spacing={3}>
                <Grid container sx={{ bgcolor: 'background.main', borderRadius: 5 }} direction="row" justifyContent='space-evenly' spacing="3">
                    <Grid item md={3} >
                        <Stack direction="column" sx={{ bgcolor: 'background.main', borderRadius: 5, padding: 2, height: 1 / 1 }} spacing={2} justifyContent='space-between'>
                            <Typography variant='h6'>{question}  </Typography>
                            <Stack direction='row' spacing={1} justifyContent='flex-start' alignItems='center' >
                                <Avatar src={avatar} alt={author} />
                                <Typography variant='body2' >{author} </Typography>
                            </Stack>
                        </Stack>
                    </Grid>


                    <Grid item md={6} >
                        <Stack direction={totalAnswers >= 4 ? 'column' : 'row'} p={2} justifyContent='center' alignItems='center' spacing={2}>
                            {answers &&
                                Object.keys(answers).map((answer) => <Answer key={answer} id={answer} answer={answers[answer]} question={questionid} answers={answers} />)}
                        </Stack>
                    </Grid>


                    <Grid item md={3}>
                        <Avatar variant='square' sx={{ height: 1 / 1, width: 1 / 1 }} src={avatar} alt={author} />
                    </Grid>
                </Grid >


                <Stack direction='row' justifyContent='space-between'>
                    <Link component={LinkRouter} to={`/questions/${prev}`}> Previous Question</Link>
                    <Link component={LinkRouter} to={`/questions/${next}`}>Next Question</Link>
                </Stack>


            </Stack>
        </Container >
    )
}

const mapStateToProps = (
    { Questions: { questions }, Users: { users } }, { match }
) => {
    const CurrentID = match.params.qid;
    const questionIds = Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp

    )
    const currentindex = questionIds.indexOf(CurrentID)
    const next = currentindex < questionIds.length - 1 ? questionIds[currentindex + 1] : CurrentID;
    const prev = currentindex > 0 ? questionIds[currentindex - 1] : CurrentID
    const question = questions[CurrentID];
    const user = users[question.author];
    return {
        question: user || question ? formatQuestion(question, user) : {},
        questionid: CurrentID,
        next,
        prev,
        totalAnswers: questionIds.length
    };
};
export default withRouter(connect(mapStateToProps)(QuestionDetails))
