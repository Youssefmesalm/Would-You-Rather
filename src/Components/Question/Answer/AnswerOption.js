import React from 'react';
import { AnswerOption } from '../Styles/Answer';
import { Avatar, AvatarGroup, Typography, Stack } from '@mui/material';
import { connect } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';
import { formatUser } from '../../../Utilitis/Helper';
import { ChangeAnswer, Handle_Save_Answer, Open_Login_form } from '../../../Actions/QuestionsActions';
import { Box } from '@mui/system';

export const Answer = ({ answers, users, text, votes, AuthUser, isAuth, AnswerdQuestions, id, question, dispatch }) => {
    const oldAnswerd = isAuth && (AnswerdQuestions.includes(question) && formatUser(users[AuthUser]).answers[question])

    const handleClick = a => {
        const Newanswer = { authedUser: AuthUser, qid: question, answer: a }
        !isAuth ? dispatch(Open_Login_form()) : AnswerdQuestions.includes(question) ?
            oldAnswerd !== a ? dispatch(ChangeAnswer({ ...Newanswer, oldAnswerd: oldAnswerd })) : null :

            dispatch(Handle_Save_Answer(
                Newanswer
            ))
    };
    const AnswersArray = Object.keys(answers)
    let totalvotes = 0;

    AnswersArray.map((a) => {
        totalvotes = totalvotes + answers[a].votes.length
    })

    return (
        <AnswerOption border={oldAnswerd === id ? '5px solid rgba(255, 64, 34, 0.51)' : "none"} spacing={3} onClick={() => handleClick(id)} key={id}>

            <Typography variant="body1">{text}</Typography>
            {AnswerdQuestions && AnswerdQuestions.filter((item) =>
                item === question).length == 0 ? null :
                <Stack direction='column' sx={{ width: 1 / 1 }} justifyContent='flex-start' spacing={2}>
                    <LinearProgress variant='determinate' value={(votes.length / totalvotes) * 100} />
                    <Stack direction='row' justifyContent='space-between'>
                        <AvatarGroup max={4}>
                            {votes && votes.map((usr, id) => {
                                const user = users[usr] 
                                const formatedUser = formatUser(user)
                                const { avatar, name } = formatedUser
                                return (
                                    <Avatar key={usr} key={id} size='small' src={avatar} alt={name} sx={{ width: 30, height: 30 }} />)
                            })}
                        </AvatarGroup>
                        <Typography variant='caption' ><Box sx={{ width: 25, height: 25, bgcolor: "background.main", borderRadius: 50, textAlign: "center" }}>{votes ? votes.length : 0}</Box>Votes</Typography>            </Stack></Stack>}
        </AnswerOption>
    );
};

const mapStateToProps = ({ Users: { users, AuthUser, isAuth }, Questions: { AnswerdQuestions } }, { answer }) => {
    const { text, votes } = answer

    return {
        users, text, votes, AnswerdQuestions, AuthUser, isAuth
    };
}
export default connect(mapStateToProps)(Answer);
