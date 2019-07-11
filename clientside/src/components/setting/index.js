import React from 'react'

import { coordsReg } from '../../constants/regex';

import {
    Grid, Button, withStyles, Container, TextField, Box,
    Paper
} from '@material-ui/core'
import { ExitToApp, Edit, Map } from '@material-ui/icons'

import { setCoords, getCoords } from '../controllers/ChickenHouseController'
import SettingPanel from './SettingPanel'



const style = theme => ({
    button: {
        margin: theme.spacing(1),
        spacing: theme.spacing(3)
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
});


class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latError: false,
            lonError: false,
            disableSave: false,
            editMode: false
        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentWillMount() {
        getCoords().then((data) => {
            this.setState({
                lat: data.latitude,
                lon: data.longitude
            })
        })
    }
    getButType() {
        if (this.state.editMode)
            return "outlined"
        else
            return "contained"
    }
    onCheckMap = event => {
        window.open("https://www.openstreetmap.org/#map=16/" + this.state.lat + "/" + this.state.lon)
    }
    onChange = valueName => event => {
        this.setState({
            [valueName]: event.target.value
        })
        if (valueName === 'lat') {
            event.target.value.match(coordsReg.latitude) ? this.setState({ latError: false }) : this.setState({ latError: true })
        }
        if (valueName === 'lon') {
            event.target.value.match(coordsReg.longitude) ? this.setState({ lonError: false }) : this.setState({ lonError: true })
        }
        if (this.state.latError || this.state.lonError)
            this.setState({ disableSave: true })
        event.preventDefault()
    }
    handleEdit = event => {
        if (this.state.editMode && !this.state.disableSave)
            setCoords(this.state.lat, this.state.lon)
        this.setState({ editMode: !this.state.editMode })
        event.preventDefault()
    }

    handleLogout(event) {
        localStorage.removeItem('userToken')
        this.props.history.push('/')
        event.preventDefault()
    }
    render() {
        const { lat, lon, errorText, latError, lonError, editMode, disableSave } = this.state
        return (
            <>
                <Container maxWidth="md">
                    <Grid container spacing={3} direction="row" justify="center" alignContent="center"  >
                                    <Grid item >
                                        <TextField
                                            error={latError}
                                            disabled={!editMode}
                                            id="outlined-name"
                                            label="Latitudine"
                                            className={this.textField}
                                            value={lat}
                                            onChange={this.onChange('lat')}
                                            errortext={errorText}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item  >
                                        <TextField
                                            error={lonError}
                                            disabled={!editMode}
                                            id="outlined-name"
                                            label="Longitudine"
                                            className={this.textField}
                                            value={lon}
                                            onChange={this.onChange('lon')}
                                            errortext={errorText}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item >
                                        <Box mt={3}>
                                            <Button variant={this.getButType()} color="secondary"
                                                className={this.button}
                                                onClick={this.handleEdit}
                                                disabled={disableSave}
                                            >
                                                <Edit className={this.leftIcon} />
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item >
                                        <Box mt={3}>
                                            <Button variant="contained" color="secondary"
                                                className={this.button}
                                                onClick={this.onCheckMap}
                                                disabled={disableSave}
                                            >
                                                <Map className={this.leftIcon} />
                                            </Button>
                                        </Box>
                                    </Grid>
                                    

                        <Grid container item direction='row' justify="center" alignContent="center" spacing={2} xs={12} md={12} lg={12}>
                            <Paper margin={3}>
                                <Box p={4}>
                                    <Grid item >
                                        <SettingPanel />
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid >

                        <Grid container item spacing={1} direction="row" alignContent="center" justify="center">
                            <Grid item>
                                <Button variant="contained" color="secondary"
                                    className={this.button}
                                    onClick={this.handleLogout}>
                                    <ExitToApp className={this.leftIcon} />
                                    Logout
                                    </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Container>
            </>
        )
    }
}
export default withStyles(style)(Setting)