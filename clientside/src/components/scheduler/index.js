import React from 'react'

import { Grid, TableHead, Table, TableRow, TableCell, TableBody, withStyles, Paper, Typography, Box } from '@material-ui/core';

import { createJob, updateJob, deleteJob, getAllJobs } from '../../controllers/JobController'
import { getAutomatism, getDoorstatus } from '../../controllers/ChickenHouseController'
import { Warning } from '@material-ui/icons'
import CreateNewJob from './elements/CreateNewJob'
import SchedulerRow from './elements/SchedulerRow'

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
    error: {
        color: red[500]
    }

})

class Scheduler extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            disabled: false,
            doorStatus: null
        }
        this.getJobs = this.getJobs.bind(this)
        this.create = this.create.bind(this)
        this.getDoor = this.getDoor.bind(this)
    }
    componentWillMount() {
        this._isMounted = true;
        this.getJobs()
        getAutomatism().then(data => {
            this.setState({ disabled: !!+data.luminosity })
        })
    }
    componentWillUpdate() {
        setTimeout(() => {
            getDoorstatus().then(data => {
                if (this._isMounted) {
                    this.setState({
                        doorStatus: data.doorStatus
                    })
                }
            })
        }, 1000);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    getDoor() {
        if (this.state.doorStatus === 1)
            return 'Aperta'
        if (this.state.doorStatus === 0)
            return 'Chiusa'
        else
            return 'In movimento'
    }


    getJobs() {
        getAllJobs()
            .then(data => {
                this.setState({
                    jobs: data
                })
            })
        getDoorstatus().then(data => {
            if (this._isMounted) {
                this.setState({
                    doorStatus: data.doorStatus
                })
            }
        })

    }
    create(date, move) {
        createJob(date, move).then(() => { }).then(() => {
            this.getJobs()
        })
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
                    {disabled && (<Paper margin={3}><Box margin={4}><Typography className={classes.error}><Warning /> Attenzione! Abilita l'opzione "Con calendario solare" tramite il pannello delle impostazioni, altrimenti gli eventi non verrano eseguiti</Typography></Box></Paper>)}
                    <Paper margin={3}>
                        <Box margin={4}>
                            <Typography > Attualmente la porta é {this.getDoor()}</Typography>
                        </Box>
                    </Paper>
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
                                            reload={this.getJobs} />)
                                    )}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Paper>
                    <Grid item>
                        <CreateNewJob
                            handleCreate={this.create}
                            disabled={disabled} />
                    </Grid>
                </Grid>
            </>
        )
    }
}
export default withStyles(style)(Scheduler)