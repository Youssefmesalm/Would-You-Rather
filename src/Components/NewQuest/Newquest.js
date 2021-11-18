import React, { useState } from "react";
import { Button, TextField, Typography } from '@mui/material';
import { Stack } from "@mui/material";
import { connect } from "react-redux";
import { HandleSetNewQuestion, Open_Login_form } from "../../Actions/QuestionsActions";

export const NewQuest = ({ isAuth, dispatch, AuthUser }) => {


    const [quest, setquest] = useState('');
    const [answers, SetAnswers] = useState([{ text: "", votes: [] }, { text: "", votes: [] }])

    // function
    const addNewOption = () => {
        SetAnswers([...answers, { text: "", votes: [] }])
    }

    const handleCreate = () => {
        const new_question = { author: AuthUser, answers, question: quest }
        isAuth ? dispatch(HandleSetNewQuestion(new_question)) : dispatch(Open_Login_form())
    }
    const handleChange = (event) => {
        setquest(event.target.value);
    };
    const handleOptionchange = (event, id) => {
        let newanswers = [...answers];
        newanswers[id].text = event.target.value;
        SetAnswers(newanswers);
    };
    const colors = ['green', 'blue', ' black', 'white', 'red', 'yellow', 'pink', 'rose']
    //render

    return (
        < form component="form" onSubmit={handleCreate} noValidate >
            <Stack direction='column' spacing={2} sx={{
                maxWidth: 600, padding: 3
            }}>
                <Stack spacing={2}>
                    <Typography variant='h4'>Create New Poll</Typography>
                    <Typography>Complete the blew fileds to create your new question</Typography>
                    < TextField id="Ask" label="Your Question" maxRows={1} required placeholder='What color would you rather ?'
                        value={quest} onChange={handleChange} />

                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography > Answer Options </Typography>
                    <Button variant='outlined' onClick={addNewOption} size='small' > Add New Option</Button>
                </Stack>
                <Stack spacing={1}> {answers.map((a, id) => {
                    let idx = id + 1; return (
                        < TextField key={id} id={`option ` + idx} required label={`Option ` + idx} maxRows={1} value={a.text}
                            onChange={(e) => handleOptionchange(e, id)} placeholder={colors[id]} />)
                })}
                </Stack>
                <Button variant='contained' onClick={handleCreate} > Ask </Button>
            </Stack >
        </form >)

}
const mapStateToProps = ({ Users: { AuthUser, isAuth } }) => {
    return {
        AuthUser,
        isAuth
    }
}

export default connect(mapStateToProps)(NewQuest);
