import React from 'react'


import { Button, Paper, Slide, withStyles, Grid,
     Select, MenuItem,OutlinedInput, Fab  } from '@material-ui/core'
import { PlusOne, Save } from '@material-ui/icons'

import DateTimePicker from './DateTimePickers'
import moment from 'moment'

import { createJob } from '../../controllers/JobController'

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
        width: '30%',
        margin: theme.spacing(1)
    }, 
    newjob: {
        height: 300,
        width: 300
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
        this.onChangeDate = this.onChangeDate.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
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
    handleShow = event =>{
        this.setState({
            show: !this.state.show
        })
        event.preventDefault()
    }
    handleCreate = event => {
        if(this.state.show){
            createJob(this.state.date, this.state.move)
            this.props.reload()
        }
        event.preventDefault()
    }
    render() {
        const { show, date } = this.state
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.wrapper} >
                    <Button onClick={this.handleShow} variant={this.getButType()} color="primary">
                        <PlusOne />
                    </Button>
                    <Slide className={classes.newjob} direction='up' in={show} mountOnEnter unmountOnExit>
                        <Paper elevation={4} className={classes.paper}>
                            <Grid container className={classes.newjob} spacing={2} direction='row' alignItems="center" justify="center">
                                <Grid container item>
                                    <DateTimePicker 
                                        updateDateTime={this.onChangeDate}
                                        date={date}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
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
                                <Grid item>
                                    <Fab onClick={this.handleCreate} color='primary'>
                                        <Save/>
                                    </Fab>
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