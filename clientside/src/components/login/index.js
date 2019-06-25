import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
// import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

<<<<<<< HEAD
import FormControlLabel from '@material-ui/core/FormControlLabel';

import auth from '../app/auth'
=======
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { userService } from '../_services/user.services'
>>>>>>> c4bb29cb0be687ca4ae509506d8e746808a2e93a

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
        // this.callBackendAPI()
        //     .then(res => this.setState({ data: res.express }))
        //     .catch(err => console.log(err));
    }
<<<<<<< HEAD
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
=======
    callStatusAuth = (username,password) => {
        const res = fetch('/auth')
        console.log(this.refs.username,this.refs.password)
        this.setState({
            auth: res.body
>>>>>>> c4bb29cb0be687ca4ae509506d8e746808a2e93a
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
                
                style={{ minHeight: '100vh' }}
            >

                <Paper style={{ minWidth: '30vh' }}>
                    <Box p={8} >
                        <Typography component="h1" variant="h5" align="center">
                            Login
<<<<<<< HEAD
                        </Typography>
                        
=======
              </Typography>
                        <form onSubmit={this.checkUser}>
>>>>>>> c4bb29cb0be687ca4ae509506d8e746808a2e93a
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
<<<<<<< HEAD
                        </Button>
=======
                            </Button>
                        </form>
>>>>>>> c4bb29cb0be687ca4ae509506d8e746808a2e93a
                    </Box>
                </Paper>

            </Grid>

        )
    }

}
export default Login;