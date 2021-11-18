import Avatar from "@mui/material/Avatar";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../CopyRight.js/index.js";
import { Container, Autocomplete, Typography, Link, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { GettingAllUsers } from "../../Actions/UserActions";
import { Login, Signup } from "../../Actions/AuthActions";
import { formatUser } from "../../Utilitis/Helper.js";
import { Form, FormContainer } from "./styles/Start.js";

export const Start = ({ users, usernames, GetUsers, Login, signup, setisUser, isUser }) => {
    const [User, setUser] = useState(JSON.stringify(localStorage.getItem("AuthUser")));
    const user = User !== "" ? users[User] : null;
    const authUser = user ? formatUser(user) : null;

    const handleSignUp = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const FirstName = data.get("FirstName");
        const LastName = data.get("LastName");
        signup({ username, FirstName, LastName });
        window.localStorage.removeItem('AuthUser')
        setisUser(!isUser)
    };
    const handleSignIn = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const currentuser = data.get("currentuser");
        currentuser && Login(currentuser);

        localStorage.setItem('AuthUser', currentuser)
    };
    useEffect(() => {
        GetUsers();
    }, []);
    return (
        <Container component="main" maxWidth="xs">
            <FormContainer>
                <Form
                    component="form"
                    onSubmit={isUser ? handleSignIn : handleSignUp}
                    noValidate
                >
                    <Typography mb={2} component="h1" variant="h5">
                        {isUser ? "Log in as" : "sign up"}
                    </Typography>
                    <Avatar
                        src={authUser && authUser.avatar}
                        sx={{ m: 1, bgcolor: "secondary.dark" }}
                    >
                        {!authUser && <LockOutlinedIcon />}
                    </Avatar>

                    {isUser ? (
                        <Autocomplete
                            options={usernames}
                            sx={{ width: 300 }}
                            autoComplete
                            onChange={(event, newValue) => {
                                setUser(newValue);
                            }}
                            autoHighlight
                            id="username"
                            renderInput={(params) => (
                                <TextField {...params} label="username" name="currentuser" />
                            )}
                        />
                    ) : (
                        <Stack>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder="Enter username"
                                id="username"
                                label="username"
                                name="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder="Enter FirstName"
                                id="FirstName"
                                label="FirstName"
                                name="FirstName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder="Enter LastName"
                                id="LastName"
                                label="LastName"
                                name="LastName"
                                autoFocus
                            />
                        </Stack>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isUser ? "sign in" : "sign up"}
                    </Button>
                    <Link onClick={() => setisUser(!isUser)}>
                        {isUser ? "create an account" : "I have an account"}
                    </Link>
                </Form>
            </FormContainer>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

Start.propTypes = {};

const mapStateToProps = ({ Users }) => {
    const { users, isAuth } = Users;
    const usernames = Object.keys(users);

    return {
        usernames,
        users,
        isAuth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching plain actions
        GetUsers: () => dispatch(GettingAllUsers()),
        Login: (user) => dispatch(Login(user)),
        signup: (user) => dispatch(Signup(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
