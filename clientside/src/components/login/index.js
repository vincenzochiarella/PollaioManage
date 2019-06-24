import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
// import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { userService } from '../_services/user.services'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            data: null
        }
        this.checkUser = this.checkUser.bind(this)
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }
    callStatusAuth = (username,password) => {
        const res = fetch('/auth')
        console.log(this.refs.username,this.refs.password)
        this.setState({
            auth: res.body
        })
    }

    callBackendAPI = async () => {
        const response = await fetch('/prova');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    checkUser(event){
        userService.login(this.state.username, this.state.password).then(
            user => {
                console.log("User ok")
            }
            )
            event.preventDefault()
    }
    handleChange = name => ({target : {value}}) => {
        this.setState({
            [name] : value
        })
    }


    render() {

        return (

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="top"
                style={{ minHeight: '100vh' }}
            >

                <Paper style={{ minWidth: '30vh' }}>
                    <Box p={8} >
                        <Typography component="h1" variant="h5" align="center">
                            Login
              </Typography>
                        <form onSubmit={this.checkUser}>
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
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ minHeight: '4vh' }}
                            >
                                Login
                            </Button>
                        </form>
                    </Box>
                </Paper>

            </Grid>

        )
    }

}
export default Login;