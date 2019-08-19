import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


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
            <Paper style={{ minWidth: '30vh' }}>
                <Grid container justify='center' alignItems='center' direction='column' spacing={3}>
                    <Grid item>
                        <Typography variant="h3" align="center">
                            Login
                            </Typography>
                    </Grid>
                    <Grid item>

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
                    </Grid>
                    <Grid item>


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
                    </Grid>
                    <Grid item lg={6}>
                        <Button
                            onClick={this.callStatusAuth}
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ minHeight: '4vh' }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

}
export default Login;