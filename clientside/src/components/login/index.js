import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { login, isAuthenticated } from '../../controllers/UserController'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            data: null
        }

    }
    callStatusAuth = event => {
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        login(user).then(res => {
            if (() => isAuthenticated())
                this.props.history.push('/dashboard')
        })
        event.preventDefault()
    }
    handleChange = name => ({ target: { value } }) => {
        this.setState({
            [name]: value
        })
    }


    render() {

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >

                <Paper style={{ minWidth: '30vh' }}>
                    <Box p={8} >
                        <Typography component="h1" variant="h5" align="center">
                            Login
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            label="Username"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <Button
                            onClick={this.callStatusAuth}
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ minHeight: '4vh' }}
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>

            </Grid>

        )
    }

}
export default Login;