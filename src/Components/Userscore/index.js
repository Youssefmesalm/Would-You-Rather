import { Container, Stack, Divider, Typography, Avatar } from "@mui/material"
import React from "react"
import { connect } from "react-redux"
import { formatUser } from "../../Utilitis/Helper"

export function UserScore({ name, score, avatar, answersCount, questionCount }) {
    return (
        <Container sx={{ bgcolor: "background.main", p: 3, borderRadius: 5 }}>
            <Stack direction='column' spacing={2} >
                <Stack pl={4} direction='row'> <Typography variant="h6" > {name}</Typography></Stack>
                <Divider />
                <Stack direction="row" justifyContent='space-evenly' spacing={2}>
                    <Avatar src={avatar} alt={name} sx={{ width: 150, height: 150 }} />
                    <Stack direction='column' spacing={2} justifyContent='center'>
                        <Typography variant='body1'>Answers : {answersCount}</Typography>
                        <Typography variant='body1'>Questions : {questionCount}</Typography>


                    </Stack>
                    <Stack direction='column' alignItems='center' justifyContent='center' spacing={2}>
                    <Typography variant='h5'>Total Score</Typography>
                    <Typography variant='h5'>{score}</Typography>
                </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}
const mapStatetoProps = ({ Users: { users } }, { username }) => {
    const userObj = formatUser(users[username])
    const { name, avatar, score, answersCount, questionCount } = userObj
    return { name, avatar, score, answersCount, questionCount }

}
export default connect(mapStatetoProps)(UserScore)
