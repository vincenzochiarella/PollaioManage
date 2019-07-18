import React from 'react'

import { Button, withStyles, Box, Paper, Create } from '@material-ui/icons'
import SchedulerRow from '../elements/SchedulerRow'
import { Grid, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core';

import { createJob, updateJob, deleteJob, getAllJobs } from '../controllers/JobController'
import CreateNewJob from '../elements/CreateNewJob'

class Scheduler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: []
        }
    }
    componentWillMount() {
        this.setState({
            jobs: getAllJobs()
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
        const { jobs } = this.state
        return (
            <Grid container direction='column'>
                <Grid item>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> ID </TableCell>
                                <TableCell> Data e Orario </TableCell>
                                <TableCell> Apertura/Chiusura </TableCell>
                                <TableCell> Status </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jobs.map(row => (
                                <SchedulerRow row={row}
                                    delete={this.delete}
                                    update={this.update} />
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item>
                    <CreateNewJob create={this.create}/>
                </Grid>
            </Grid>

        )
    }
}
export default Scheduler