import { Avatar, Stack, Typography, Dialog, Link, IconButton, Button } from "@mui/material";
import React, { useState } from "react";
//import PropTypes from "prop-types";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { formatUser } from "../../Utilitis/Helper";
import { MenuItems, LogoStack, MenuStack, RightSide } from "./styles/Menu";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Start from "../Start";
import { Change_List, Close_Login_form, Fillanswerdlist, Fillunanswerdlist, Hide_Answer, Open_Login_form } from "../../Actions/QuestionsActions.js"
import { Logout } from "../../Actions/AuthActions";
export const Menu = ({ authUser: { avatar, name }, isAuth, dispatch, OpenLogin }) => {
    const history = useHistory()
    const [isUser, setisUser] = useState(true);
    const handleOpenLogin = () => {
        setisUser(true);
        dispatch(Open_Login_form())
    };
    const handleOpenSignup = () => {

        setisUser(false);
        dispatch(Open_Login_form())
    };

    const handleClose = () => {
        dispatch(Close_Login_form())
    };
    const handleLogout = () => {
        dispatch(Logout())
        dispatch(Hide_Answer(false))
        history.push('/')
        dispatch(Change_List("All"))
        dispatch(Fillanswerdlist([]))
        dispatch(Fillunanswerdlist([]))

    }
    return (
        <MenuStack
            container
            alignItems="center"
            justifyContent="space-between"
        >

            <LogoStack item md={4} sm={3}>
                <Typography
                    color="primary"
                    sx={{ fontWeight: "fontWeightBold" }}
                    variant="h4"
                >
                    <Link component={LinkRouter} to="/" onClick={() => dispatch(Change_List("All"))} >
                        Would You Rather</Link>
                </Typography>
            </LogoStack>
            <MenuItems item md={3} sm={4}>
                <Stack direction="row" justifyContent="space-between">
                    <Link component={LinkRouter} to='/' onClick={() => dispatch(Change_List("All"))}>{isAuth ? "All" : "Questions"}</Link>
                    {isAuth && <><Link component={LinkRouter} to='/' onClick={() => dispatch(Change_List("Unanswerd"))}>Recent</Link>
                        <Link component={LinkRouter} to='/' onClick={() => dispatch(Change_List("Answerd"))}>Answerd</Link></>}

                    <Link component={LinkRouter} to='/leaderboard' >LeaderBoard</Link>
                </Stack>
            </MenuItems>
            <RightSide item md={2} sm={3}>
                <Stack direction="row" justifyContent="space-evenly" alignItems='center'>
                    {isAuth ? <Stack direction='row' justifyContent='flex-start' spacing={1} alignItems='center'> <Typography variant='body1'>{name}</Typography> <Avatar size='small' src={avatar} alt={name} /></Stack>
                        : <Button size='small' variant='contained' onClick={handleOpenSignup} >SignUp </Button>}
                    {isAuth ?
                        <IconButton onClick={handleLogout}>
                            <ExitToAppIcon color='error' /> </IconButton>
                        : <Button size='small' variant='outlined' onClick={handleOpenLogin} >login</Button>
                    }


                    {!isAuth && <Dialog
                        open={OpenLogin}
                        onClose={handleClose}
                        aria-labelledby="responsive-login"
                    >
                        <Start isUser={isUser} setisUser={setisUser} />
                    </Dialog>
                    }
                </Stack>
            </RightSide >
        </MenuStack >
    );
};

Menu.propTypes = {};

const mapStateToProps = ({ Users, Questions: { OpenLogin } }) => {
    const { users, AuthUser, isAuth } = Users;
    const user = users ? users[AuthUser] : null;
    return {
        authUser: AuthUser && formatUser(user),
        isAuth, OpenLogin
    };
};

export default connect(mapStateToProps)(Menu);
