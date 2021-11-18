import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import { QuestionStack, QuestionWrapper } from "./Styles/Question";
import { Select_Question } from '../../Actions/QuestionsActions'
import { formatQuestion } from "../../Utilitis/Helper";

export const Question = ({ bg, id, questionid, question: { author, avatar, answers, question }, dispatch }) => {
    const handleClick = () => {
        dispatch(Select_Question(question, questionid, author, avatar, answers))
    }
    return (
        <QuestionWrapper key={id} item xs={3} sm={2} md={2} onClick={handleClick} >
            <QuestionStack bg={bg} direction="column" spacing={2} justifyContent='flex-start' >
                <Avatar src={avatar} alt={author} sx={{ width: 90, height: 90 }} />
                <Typography variant="body1" textAlign="center">
                    {question}
                </Typography>
            </QuestionStack>
        </QuestionWrapper>
    );
};

Question.propTypes = {};

const mapStateToProps = (
    { Questions: { questions }, Users: { users } },
    { id }
) => {
    const question = questions[id];
    const user = users[question.author];
    return {
        question: user || question ? formatQuestion(question, user) : {},
        questionid: id,
    };
};

export default connect(mapStateToProps)(Question);
