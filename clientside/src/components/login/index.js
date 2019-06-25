import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import auth from '../app/auth'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clientId: null,
            auth: false,
            data: null
        }
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        // this.callBackendAPI()
        //     .then(res => this.setState({ data: res.express }))
        //     .catch(err => console.log(err));
    }
    callStatusAuth = event => {
        // const res = await fetch('/auth',{
        //     body: {
        //         username: user,
        //         password: password
        //     }
        // })
        
        // console.log(res.body)
        // this.setState({
        //     auth: res.body
        // })
        auth.login(()=>{
            this.props.history.push('/dashboard')
        })
        event.preventDefault()
    }

    // callBackendAPI = async () => {
    //     const response = await fetch('/prova');
    //     const body = await response.json();
    //     if (response.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     return body;
    // };




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
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                onClick={this.callStatusAuth}
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ minHeight: 'vh' }}

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