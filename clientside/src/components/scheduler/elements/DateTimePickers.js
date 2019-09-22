
import React from 'react';

import { Grid } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
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
                <DateTimePicker 
                    margin="normal"
                    disablePast
                    label="Data e orario"
                    inputVariant="outlined"
                    ampm={false} 
                    value={selectedDate}
                    onChange={this.handleDateChange}/>
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }
}

export default DatePicker
