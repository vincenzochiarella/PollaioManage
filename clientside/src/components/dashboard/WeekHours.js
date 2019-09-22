import React from 'react';
// import axios from 'axios'



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Fab, Grid } from '@material-ui/core'
import { Sync } from '@material-ui/icons'

import moment from 'moment'


class WeekHours extends React.Component {
    showToday(day) {
        if (day === moment().format('YYYY-MM-DD')) {
            return true
        } else return false
    }

    render() {
        const { listWeekMovement, handleReload } = this.props
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
                            {listWeekMovement && listWeekMovement.map(row => (
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
                    <Fab onClick={handleReload} color='secondary'>
                        <Sync/>
                    </Fab>
                </Grid>
            </Grid >
        )
    }

}
export default WeekHours;