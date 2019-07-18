import React from 'react'


import { Button, Paper, Slide, withStyles, Grid,
    InputLabel, Select, MenuItem  } from '@material-ui/core'
import { PlusOne } from '@material-ui/icons'

import DateTimePicker from './DateTimePickers'
import moment from 'moment'

const styles = theme => ({
    root: {
        height: 100
    },
    wrapper: {
        width: 100 + theme.spacing(2)
    },
    paper: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1)
    }
})

class CreateNewJob extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            date: moment(),
            move: 0
        }
    }
    onChangeDate(date) {
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

    getButType() {
        if (this.state.show)
            return "outlined"
        else
            return "contained"
    }
    createJob(){
        this.props.create(this.state.date, this.state.move)
    }
    render() {
        const { show, date } = this.state
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.wrapper} >
                    <Button onClick={this.handleClick} variant={this.getButType}>
                        <PlusOne />
                    </Button>
                    <Slide direction='up' in={show} mountOnEnter unmountOnExit>
                        <Paper elevation={4} className={classes.paper}>
                            <Grid container spacing={2} direction='row'>
                                <Grid item>
                                    <DateTimePicker updateDateTime={this.onChangeDate}
                                        date={date}
                                    />
                                </Grid>
                                <Grid item>
                                    <InputLabel htmlFor="mossa"> Move </InputLabel>
                                    <Select onChange={this.onChangeMove} required>
                                        <MenuItem value={0}>Chiudi</MenuItem>
                                        <MenuItem value={1}>Apri</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Button onCLick={this.createJob}></Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Slide>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(CreateNewJob)