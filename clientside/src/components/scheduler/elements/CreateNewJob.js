import React from 'react'


import {
    withStyles, Grid, Button,
    Select, MenuItem, OutlinedInput, Fab, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'
import { PlusOne, Save } from '@material-ui/icons'

import DateTimePicker from './DateTimePickers'
import moment from 'moment'


const styles = theme => ({
    paper: {
        zIndex: 1,
        position: 'relative',
        width: '30%',
        margin: theme.spacing(1)
    },
    select: {
        marginLeft: 30,
        marginRight: 30,
        width: 225
    }

})

class CreateNewJob extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            date: moment(),
            id: 0,
            move: 0
        }
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
        this.handleDialogOpen = this.handleDialogOpen.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
    }
    handleDateTimeChange(date) {
        this.setState({
            date: date
        })
    }
    onChangeMove = event => {
        this.setState({
            move: event.target.value
        })
        event.preventDefault()
    }
    handleDialogOpen = event => {
        this.setState({
            show: !this.state.show
        })
        event.preventDefault()
    }
    handleCreate = event => {
        this.props.handleCreate( this.state.date, this.state.move)
        this.handleDialogOpen(event)
        event.preventDefault()
    }
    render() {
        const { show, date } = this.state
        const { classes, disabled } = this.props
        return (<>
            <Fab onClick={this.handleDialogOpen} disabled={disabled} variant='extended' color="primary">
                <PlusOne /> Crea un evento
            </Fab>
            <Dialog fullWidth={true}
                maxWidth="lg"
                open={show}
                onClose={this.handleDialogOpen}>
                <DialogTitle> Crea un' apertura o chiusura programmata</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} direction='column' alignItems="center" justify="center">
                        <Grid container item>
                            <DateTimePicker
                                updateDateTime={this.handleDateTimeChange}
                                date={date}
                            />
                        </Grid>
                        <Grid item>
                            <Select variant='outlined' onChange={this.onChangeMove} className={classes.select} value={this.state.move}
                                input={
                                    <OutlinedInput
                                        name="age"
                                        id="outlined-age-simple"
                                    />
                                }>
                                <MenuItem value={0}>Chiudi</MenuItem>
                                <MenuItem value={1}>Apri</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Fab onClick={this.handleCreate} variant='extended' color='primary'>
                        <Save /> Salva
                    </Fab>
                    <Button onClick={this.handleDialogOpen} color="primary">
                        Annulla
                    </Button>
                </DialogActions>
            </Dialog >
        </>
        )
    }

}

export default withStyles(styles)(CreateNewJob)