import React from 'react';
// import axios from 'axios'



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Fab, Grid } from '@material-ui/core'
import { Sync } from '@material-ui/icons'

import { getWeekSunMoovement, refreshWeekMovements } from '../../controllers/SunMoovementController'
import moment from 'moment'


class WeekHours extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sunMoovement: []
        }
        this.handleReload = this.handleReload.bind(this)
    }
    componentWillMount() {
        getWeekSunMoovement().then(data => this.setState({ sunMoovement: data }))
    }

    showToday(day) {
        if (day === moment().format('YYYY-MM-DD')) {
            return true
        } else return false
    }
    handleReload(event){
        refreshWeekMovements().then(data=> this.setState({ sunMoovement: data }))
        event.preventDefault()
    }

    render() {
        return (
            <Grid container item direction='row' justify='center'>
                <Grid item lg={11} md={11} xs={11}>
                    <Table >
                        <TableHead>
                            <TableRow >
                                <TableCell>Giorno della settimana</TableCell>
                                <TableCell align="right">Alba</TableCell>
                                <TableCell align="right">Tramonto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.sunMoovement && this.state.sunMoovement.map(row => (
                                <TableRow key={row.day} selected={this.showToday(row.day)}>
                                    <TableCell component="th" scope="row">
                                        {row.day}
                                    </TableCell>
                                    <TableCell align="right">{row.sunrise}</TableCell>
                                    <TableCell align="right">{row.sunset}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </Grid>
                <Grid item  lg={1} md={1} xs={1}>
                    <Fab onClick={this.handleReload} color='secondary'>
                        <Sync/>
                    </Fab>
                </Grid>
            </Grid >

        )
    }

}
export default WeekHours;