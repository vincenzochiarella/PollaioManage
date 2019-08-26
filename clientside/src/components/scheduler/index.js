import React from 'react'

import SchedulerRow from '../elements/SchedulerRow'
import { Grid, TableHead, Table, TableRow, TableCell, TableBody, withStyles, Paper, Typography, Box } from '@material-ui/core';

import { createJob, updateJob, deleteJob, getAllJobs } from '../../controllers/JobController'
import { getAutomatism } from '../../controllers/ChickenHouseController'
import { Warning } from '@material-ui/icons'
import CreateNewJob from '../elements/CreateNewJob'
import { red } from '@material-ui/core/colors';

const style = theme => ({
    root: {
        width: '70%',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        overflowX: 'auto',
    },
    table: {
        minWidth: '75%'
    },
    error:{
        color: red[500]
    }

})

class Scheduler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            disabled: false
        }
        this.updateJobsList = this.updateJobsList.bind(this)
    }
    componentWillMount() {
        this.updateJobsList()
        getAutomatism().then(data => {
            this.setState({ disabled: !!+data.luminosity })
        })
    }

    updateJobsList() {
        getAllJobs()
            .then(data => {
                this.setState({
                    jobs: data
                })
            })
    }
    create(date, move) {
        createJob(date, move)
    }
    update(id, date, move) {
        updateJob(id, date, move)
    }
    delete(id) {
        deleteJob(id)
    }


    render() {
        const { jobs, disabled } = this.state
        const { classes } = this.props

        return (
            <>
                <Grid item container direction='column' alignItems='center'>
                    {disabled && (<Paper margin={3}><Box margin={4}><Typography className={classes.error}><Warning /> Attenzione! Abilita lo schedulatore tramite il pannello delle impostazioni altrimenti i lavori non verrano svolti</Typography></Box></Paper>)}
                    <Paper className={classes.root}>
                        <Grid item>
                            <Table className={classes.table}>
                                <TableHead >
                                    <TableRow>
                                        <TableCell> ID </TableCell>
                                        <TableCell> Data e Orario </TableCell>
                                        <TableCell> Apertura/Chiusura </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {jobs && jobs.map((row, index) => (
                                        <SchedulerRow key={row.id}
                                            select={index % 2}
                                            row={row}
                                            delete={this.delete}
                                            update={this.update}
                                            reload={this.updateJobsList} />)
                                    )}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Paper>
                    <Grid item>
                        <CreateNewJob create={this.create}
                            reload={this.updateJobsList} />
                    </Grid>
                </Grid>

            </>
        )
    }
}
export default withStyles(style)(Scheduler)