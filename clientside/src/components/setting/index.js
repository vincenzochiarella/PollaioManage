import React from 'react'

import { Grid, Button, withStyles } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'


const style = theme => ({
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
});


class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coords: null,
            indirizzoIpCamera: ""
        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount() {
        this.setState({
            coords: {
                lat: 41.234124,
                long: 13.12343
            },
            indirizzoIpCamera: "192.168.1.2"
        })
    }
    handleLogout(event) {
        localStorage.removeItem('userToken')
        this.props.history.push('/')
        event.preventDefault()        
    }
    render() {
        return (
            <Grid>
                <Button variant="contained" color="secondary"
                    className={this.button}
                    onClick={this.handleLogout}>
                    <ExitToApp className={this.leftIcon} />
                    Logout
                </Button>

            </Grid>
        )
    }
}
export default withStyles(style)(Setting)