import { Container, Stack } from "@mui/material";
import React from "react";
import UserScore from "../../Components/Userscore";
import { connect } from "react-redux";

export function LeaderBoard({ UserNames }) {
    return (
        <Container maxWidth="sm" >
            <Stack direction='column' spacing={4}>
                {
                    UserNames.map((username) =>
                        <UserScore key={username} username={username} />
                    )}
            </Stack>
        </Container>
    )
}
const mapStatestoprops = ({ Users: { users } }) => {
    return {
        UserNames: Object.keys(users).sort(
            (a, b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)

        )

    }
}
export default connect(mapStatestoprops)(LeaderBoard);
