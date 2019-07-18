import React from 'react'


import { Button, Paper, Slide, withStyles, Grid,
    InputLabel, Select, MenuItem  } from '@material-ui/core'
import { PlusOne } from '@material-ui/icons'

import DateTimePicker from './DateTimePickers'
import moment from 'moment'

import { createJob } from '../controllers/JobController'

const styles = theme => ({
    root: {
        height: 100
    },
    wrapper: {
        width: 150+ theme.spacing(2)
    },
    paper: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1)
    }, 
    newjob: {
        height: 300,
        width: 300
    },
    select: {
        width: '30vh'
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
        this.onChangeDate = this.onChangeDate.bind(this)
    }
    onChangeDate (date) {
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
    handleClick = event =>{
        this.setState({
            show: !this.state.show
        })
        if(this.state.show){
             createJob(this.state.date, this.state.move).then() 
             this.props.reaload()
        }
        event.preventDefault()
    }
    render() {
        const { show, date } = this.state
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.wrapper} >
                    <Button onClick={this.handleClick} variant={this.getButType()} color="primary">
                        <PlusOne />
                    </Button>
                    <Slide className={classes.newjob} direction='up' in={show} mountOnEnter unmountOnExit>
                        <Paper elevation={4} className={classes.paper}>
                            <Grid container className={classes.newjob} spacing={2} direction='row' alignItems="center" justify="center">
                                <Grid item>
                                    <DateTimePicker 
                                        updateDateTime={this.onChangeDate}
                                        date={date}
                                    />
                                </Grid>
                                <Grid item >
                                    <InputLabel htmlFor="mossa"> Move </InputLabel>
                                    <Select onChange={this.onChangeMove} className={classes.select} value={this.state.move}>
                                        <MenuItem value={0}>Chiudi</MenuItem>
                                        <MenuItem value={1}>Apri</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Button onClick={this.createJob}></Button>
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