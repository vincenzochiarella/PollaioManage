import 'date-fns';
import React from 'react';

import { Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import moment from 'moment'


class DatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: moment(this.props.date).toDate()
        }
    }
    handleDateChange = event => ( date ) => {
        this.state.selectedDate( date )
        this.props.updateDateTime( moment(date).format('HH:mm DD:MM:YYYY') )
    }

    render() {
        const {selectedDate} = this.state
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container  justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="mui-pickers-date"
                        label="Data"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="mui-pickers-time"
                        label="Orario"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }
}

export default DatePicker
