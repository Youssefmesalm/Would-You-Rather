import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from '../../Components/Question';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { Fillanswerdlist, Fillunanswerdlist, Change_List, GetQuestions } from '../../Actions/QuestionsActions';
import { GettingAllUsers } from '../../Actions/UserActions';
import { formatUser, getRandomInt } from '../../Utilitis/Helper';
import { QuestionsStack, ContainerStack, AnswerStack } from './Styles/Home';
import Answers from '../../Components/Question/Answer/Answer';
const styles = [
    'linear-gradient(180deg, #352fa2 0%, #06A5C2 100%)',
    'linear-gradient(0deg, #b28af2 0%, hsl(253, 72%, 37%) 100%)',
    'linear-gradient(0deg, #FFF29F 0%, #9c8e3a 100%);',
    'linear-gradient(0deg, #FFB272 0%, #8a4638 100%)',
    'linear-gradient(0deg, #FC7272 0%, #aa4b4b 100%)',
    'linear-gradient(0deg, #E99FF2 0%, #8C2CA5 100%)',
    'linear-gradient(0deg, #3BDFD2 0%, #05745F 100%)',
    'linear-gradient(180deg, #27318b 0%, hsl(95, 100%, 72%) 100%)',
    'linear-gradient(0deg, #8AF2FF 0%, #2d5f80 100%)',
];
let initialRender = true;

export const Home = ({ AnswerdQuestions, UnAnswerdQuestions, showAnswer, isAuth, Answerd, Mode, UnAnswerd, questionIds, dispatch }) => {

    useEffect(() => {
        if (initialRender) {
            initialRender = false

            dispatch(GettingAllUsers())
        }

        dispatch(GetQuestions())
        if (isAuth) {
            dispatch(Fillanswerdlist(Answerd))
            dispatch(Fillunanswerdlist(UnAnswerd))
            dispatch(Change_List("Unanswerd"))
        }
        else {
            dispatch(Change_List("All"))
        }
    }, [questionIds.length, isAuth]);


    return (
        <ContainerStack justifyContent='center' item container spacing={2}>

            <QuestionsStack
                container
                columns={{ xs: 6, sm: 6, md: 10 }}
                item
                md={7}
                sm={6}
                xs={6}
                rowSpacing={1}
                direction="row"
                spacing={1}>
                {Mode === "All" && questionIds.map(id => (
                    <Question bg={styles[getRandomInt(0, styles.length)]} key={id} id={id} />
                ))}
                {Mode !== "Unanswerd" ? null : UnAnswerdQuestions ? UnAnswerdQuestions.map(id =>
                    <Question bg={
                        styles[getRandomInt(0, styles.length)]} key={id} id={id} />) : <Typography>Congratulations, You Answerd All questions</Typography>}



                {UnAnswerdQuestions === [] && <Typography variant='h4'>Congratulations , You Answerd All Questions .</Typography>}
                {Mode === "Answerd" && (AnswerdQuestions ? AnswerdQuestions.map(id =>
                    <Question bg={styles[getRandomInt(0, styles.length)]} key={id} id={id} />
                ) : <Typography>Congratulations, You Answerd All questions</Typography>)}


            </QuestionsStack>
            {showAnswer && <AnswerStack container direction="column" xs={12} sm={12} md={3} item>
                <Answers />
            </AnswerStack>}

        </ContainerStack>

    );
};

Home.propTypes = {};

const mapStateToProps = ({ Users: { isAuth, users, AuthUser }, Questions: { questions, showAnswer, Mode, AnswerdQuestions, UnAnswerdQuestions } }) => {
    const questionIds = Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp

    )

    let Answerd = isAuth ? Object.keys(formatUser(users[AuthUser]).answers) : null
    let UnAnswerd = isAuth ? questionIds.filter((quest) => !Answerd.includes(quest)) : null

    return {
        Answerd, UnAnswerd, Mode, isAuth,
        questions,
        questionIds,
                showAnswer,
        AnswerdQuestions,
        UnAnswerdQuestions
    };
};

export default connect(mapStateToProps)(Home);
