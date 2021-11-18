import React from 'react';
import { connect } from 'react-redux';
import { Typography, Avatar, Stack, Divider, IconButton, Link } from '@mui/material';
import {
    AnswerContainer,
    AnswerOptions,

    SelectedQuestion,
} from '../Styles/Answer';
import { Link as LinkRouter } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';
import Answer from './AnswerOption';
import { Hide_Answer } from '../../../Actions/QuestionsActions';
export const Answers = ({ question, answers, dispatch, avatar, author, qid }) => {
    return (
        <AnswerContainer direction="column" spacing={2} mt={1}>
            <SelectedQuestion spacing={1}>
                <Stack direction='row' justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h5">{question}</Typography>
                    <IconButton onClick={() => dispatch(Hide_Answer(false))}><CancelIcon color='secondary' /></IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction='row' justifyContent='flex-start' spacing={1} alignItems='center'  >
                        <Avatar src={avatar} sx={{ width: 20, height: 20 }} alt={author} />
                        <Typography variant='caption'>{author} </Typography>
                    </Stack>
                    <Typography variant='caption'> <Link component={LinkRouter} to={`/questions/${qid}`} >Show More</Link> </Typography>
                </Stack>
                <Divider />
            </SelectedQuestion>
            <AnswerOptions spacing={2} direction="column">
                {answers &&
                    Object.keys(answers).map((answer) => {

                        return (<Answer key={answer} id={answer} answer={answers[answer]} question={qid} answers={answers} />)
                    })}
            </AnswerOptions>
        </AnswerContainer>
    );
};
const mapStateToProps = ({ Questions: { selectedQuestion } }) => {
    const { question, avatar, author, answers, questionid } = selectedQuestion;
    return {
        question,
        avatar,
        answers,
        author,
        qid: questionid
    };
};
export default connect(mapStateToProps)(Answers);
