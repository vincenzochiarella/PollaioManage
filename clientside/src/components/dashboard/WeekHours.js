import React from 'react';
import moment from 'moment';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



class WeekHours extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coords: this.props.coords,
            sunMoovement: []
        }
    }
    componentDidMount() {
        this.getWeekday()
    }
    fetchAPISunset(day){
        fetch('https://api.sunrise-sunset.org/json?lat='+this.state.coords.lat+'&lng='+this.state.coords.log+'&date='+day).then(
            results => {
                return results.json()
            }).then(data => {
                this.setState({
                    sunMoovement: this.state.sunMoovement.concat(this.createSunMoovement(day,data.results.sunrise, data.results.sunset))
                })
            })   
        
    }

    createSunMoovement(day, sunrise, sunset) {

        return {
            day: day,
            sunrise: moment(sunrise, 'hh:mm:ss A').add(2,'hours').format('hh:mm:ss A'),
            sunset:  moment(sunset, 'hh:mm:ss A').add(2,'hours').format('hh:mm:ss A')
        }
    }

    getWeekday() {
        var startOfWeek = moment();
        var endOfWeek = moment().add(7,"d");

        var day = startOfWeek;
        
        while (day <= endOfWeek) {
            this.fetchAPISunset(day.format('YYYY-MM-DD'))
            day = day.clone().add(1, 'd');
        }
    };

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
                            <TableRow key={row.day}>
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