import React from 'react'

import { latitudeCheck, longitudeCheck } from '../../constants/regex';

import {
    Grid, Fab, withStyles, TextField, Box, Button, Dialog, Select, MenuItem, OutlinedInput,
    Paper, Typography, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'
import { ExitToApp, Edit, Map, BugReport } from '@material-ui/icons'

import { setCoords, getCoords } from '../../controllers/ChickenHouseController'
import { setOverrideDoor } from '../../controllers/DebugController'
import SettingPanel from './SettingPanel'



const style = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    select: {
        marginLeft: 30,
        marginRight: 30,
        width: 225
    }
});


class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: '',
            lon: '',
            latError: false,
            lonError: false,
            disableSave: false,
            editMode: false,
            openDebug: false,
            move: 0
        }
        this.handleLogout = this.handleLogout.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleChangeDoor = this.handleChangeDoor.bind(this)
        this.handleOverrideDoorState = this.handleOverrideDoorState.bind(this)
    }

    componentWillMount() {
        getCoords().then((data) => {
            this.setState({
                lat: data.latitude,
                lon: data.longitude
            })
        })
    }
    onCheckMap = event => {
        window.open("https://www.openstreetmap.org/#map=16/" + this.state.lat + "/" + this.state.lon)
        event.preventDefault()
    }
    onChange = valueName => event => {
        this.setState({
            [valueName]: event.target.value
        })
        if (valueName === 'lat') {
            event.target.value.match(latitudeCheck) ? this.setState({ latError: false }) : this.setState({ latError: true })
        }
        if (valueName === 'lon') {
            event.target.value.match(longitudeCheck) ? this.setState({ lonError: false }) : this.setState({ lonError: true })
        }
        if (this.state.latError || this.state.lonError)
            this.setState({ disableSave: true })
        else
            this.setState({ disableSave: false })
        event.preventDefault()
    }
    handleEdit = event => {
        if (this.state.editMode && !this.state.disableSave)
            setCoords(this.state.lat, this.state.lon)
        this.setState({ editMode: !this.state.editMode })
        event.preventDefault()
    }



    handleDebug = event => {
        this.setState({
            openDebug: !this.state.openDebug
        })
        event.preventDefault()
    }
    handleOverrideDoorState(event) {
        setOverrideDoor(this.state.move).then().catch(err=> console.log(err))
        this.setState({ openDebug: !this.state.openDebug })
        event.preventDefault()
    }
    handleChangeDoor(event){
        this.setState({move: event.target.value})
    }


    handleLogout(event) {
        localStorage.removeItem('userToken')
        this.props.history.push('/')
        event.preventDefault()
    }
    render() {
        const { lat, lon, latError, lonError, editMode, disableSave, openDebug } = this.state
        const { classes } = this.props
        return (
            <Grid item container direction="column" justify="center" alignItems='center' lg={6} md={9} xs={12} spacing={2} >
                <Grid item container direction='row' justify='center' alignItems='center' >
                    <Grid item lg={4} md={4} xs={5}>
                        <TextField
                            error={latError}
                            disabled={!editMode}
                            id="outlined-name"
                            label="Latitudine"
                            value={lat}
                            onChange={this.onChange('lat')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item lg={4} md={4} xs={5}>
                        <TextField
                            error={lonError}
                            disabled={!editMode}
                            id="outlined-name"
                            label="Longitudine"
                            value={lon}
                            onChange={this.onChange('lon')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid container item direction='row' lg={8} md={8} xs={8} spacing={1}>
                        <Grid item >
                            <Fab
                                color="secondary"
                                onClick={this.handleEdit}
                                disabled={disableSave}
                                variant='extended'>
                                <Edit /> Modifica
                            </Fab>
                        </Grid>
                        <Grid item>
                            <Fab
                                color="secondary"
                                onClick={this.onCheckMap}
                                disabled={disableSave}
                                variant='extended'>
                                <Map /> Visualizza su OSM
                            </Fab>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item>
                    <Paper margin={3}>
                        <Box p={4}>
                            <Grid item >
                                <SettingPanel />
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item>
                    <Fab variant="extended" color="secondary"
                        className={this.button}
                        onClick={this.handleLogout}>
                        <ExitToApp />
                        Logout
                        </Fab>
                </Grid>
                <Grid item>
                    <Paper margin={3}>
                        <Box p={4}>
                            <Typography> Debug porta</Typography>
                            <Fab color='secondary' variant='extended' onClick={this.handleDebug}> <BugReport />Debug</Fab>
                        </Box>
                        <Dialog open={openDebug} onClose={this.handleDebug}>
                            <DialogTitle>
                                Cambia status della porta manualmente
                                </DialogTitle>
                            <DialogContent>
                                <Typography> La porta é: </Typography>
                                <Select variant='outlined' onChange={this.handleChangeDoor} className={classes.select} value={this.state.move}
                                    input={
                                        <OutlinedInput
                                            name="age"
                                            id="outlined-age-simple"
                                        />
                                    }>
                                    <MenuItem value={0}>Chiusa</MenuItem>
                                    <MenuItem value={1}>Aperta</MenuItem>
                                </Select>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleDebug}>
                                    Annulla
                                    </Button>
                                <Fab onClick={this.handleOverrideDoorState} color='secondary'>
                                    <BugReport />
                                </Fab>
                            </DialogActions>
                        </Dialog>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(style)(Setting)