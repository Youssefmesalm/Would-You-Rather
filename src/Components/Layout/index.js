import React from "react";
import Start from "../Start";
import { Route, Switch, useParams } from "react-router";
import Home from "../../Pages/Home";
import { Dialog, Fab, Stack, Typography } from "@mui/material";
import LeaderBoard from "../../Pages/LeaderBoard";
import Menu from "../Menu";
import QuestionDetails from "../Question/QuestionsDetails";
import { connect } from "react-redux";

import AddIcon from '@mui/icons-material/Add'
import NewQuest from "../NewQuest/Newquest";
import { Close_Dialog, Open_Dialog } from "../../Actions/QuestionsActions";
export const Layout = ({ dispatch, openDialog }) => {

    const qid = useParams()
    console.log(qid)
    const handleOpenDialog = () => {
        dispatch(Open_Dialog())
    }
    const handleCloseDialog = () => {
        dispatch(Close_Dialog())
    }
    return (

        <Stack direction="column" position='relative' sx={{ overflowY: "auto" }} spacing={2} alignItems='center'>

            < Menu />

            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/start" component={Start} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/questions/:qid" component={QuestionDetails} />
                <Route path='*' render={() => <Typography variant='h4'>Page Not Found</Typography>} />
            </Switch>
            <Fab sx={{ position: 'fixed', bottom: 20, right: 20 }} onClick={handleOpenDialog} color="primary" aria-label="ask" > <AddIcon />

            </Fab>
            {openDialog && <Dialog

                open={openDialog}
                onClose={handleCloseDialog}
            >
                <NewQuest />
            </Dialog>
            }
        </Stack >

    );
}
const mapStateToProps = ({ Questions: { openDialog } }) => {
    return {
        openDialog
    }
}

export default connect(mapStateToProps)(Layout);
