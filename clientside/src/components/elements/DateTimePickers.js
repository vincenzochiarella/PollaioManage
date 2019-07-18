
import React from 'react';

import { Grid } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';



class DatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: this.props.date
        }
        this.handleDateChange = this.handleDateChange.bind(this)
    }
    handleDateChange = (date) => {
        this.setState({selectedDate: date } )
        this.props.updateDateTime( date )
    }

    render() {
        const { selectedDate } = this.state
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
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
