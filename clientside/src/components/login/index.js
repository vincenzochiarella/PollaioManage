import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


import { login, isAuthenticated } from '../../controllers/UserController'
import { withStyles } from '@material-ui/styles';

const style = theme =>({
    paper:{
        width:'40vh', 
        alignItems: 'center'
    }
})

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
        const { classes } = this.props
        return (
            <Paper className={classes.paper}>
                <Box marginTop={5} marginBottom={5} >
                    <Grid container item justify='center' alignItems='center' direction='column' spacing={1}>
                        <Grid item>
                            <Typography variant="h3" align="center" color='inherit'>
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
                </Box>
            </Paper>
        )
    }

}
export default withStyles(style)(Login);