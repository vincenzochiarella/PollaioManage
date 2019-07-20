import React from 'react'

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
        this.updateJobsList = this.updateJobsList.bind(this)
    }
    componentWillMount() {
        this.updateJobsList()
    }

    updateJobsList() {
        getAllJobs()
            .then(data =>{
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
        const { jobs } = this.state

        return (
            <Grid container direction='column' alignItems="center" justify="center">
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
                            {jobs && jobs.map((row, index) =>(
                                <SchedulerRow key={row.id}
                                    row={row}
                                    delete={this.delete}
                                    update={this.update}
                                    reload={this.updateJobsList} />)
                            )}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item>
                    <CreateNewJob create={this.create}
                        reload={this.updateJobsList} />
                </Grid>
            </Grid>

        )
    }
}
export default Scheduler