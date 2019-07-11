import React from 'react';
// import axios from 'axios'



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getWeekSunMoovement } from '../controllers/SunMoovementController'
import moment from 'moment'


class WeekHours extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sunMoovement: []
        }
    }
    componentWillMount() {
        getWeekSunMoovement().then(data => this.setState({ sunMoovement: data }))
    }

    showToday(day) {
        if (day === moment().format('YYYY-MM-DD')) {
            return true
        } else return false
    }

    render() {
        return (

            <Table >
                <TableHead>
                    <TableRow >
                        <TableCell>Giorno della settimana</TableCell>
                        <TableCell align="right">Alba</TableCell>
                        <TableCell align="right">Tramonto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.sunMoovement.map(row => (
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

        )
    }

}
export default WeekHours;