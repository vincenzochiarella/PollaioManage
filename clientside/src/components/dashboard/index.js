import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Box, Typography } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Chart from './GenericChart';
import OverrideOpening from '../overrideopening';
import WeekHours from './WeekHours';
import WeatherUI from './WeatherUI'

import { getTemperatures } from '../../controllers/TempereturesController'
import { getWeekSunMoovement, refreshWeekMovements } from '../../controllers/SunMoovementController'
import moment from 'moment';

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    justifyItems: 'center',
    flexDirection: 'row',
    minHeight: '300px'

  },
  height: {
    height: '300px'
  }
})

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: moment(),
      dataTemperatures: [],
      weekMovements: [],
      renderCharts: false
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }
  componentWillMount() {
    getTemperatures(this.state.selectedDate)
      .then(data => {
        this.setState({
          dataTemperatures: data,
          renderCharts: true
        })
      }).catch(err => console.log(err))

    getWeekSunMoovement()
      .then(data => this.setState({ weekMovements: data }))
      .catch(err => console.log(err))
  }

  handleDateChange(date) {
    this.setState({ selectedDate: date })
    this.setState({renderCharts:false})
    getTemperatures(date).then(data => {
      this.setState({
        dataTemperatures: data,
        renderCharts: true
      })
    }).catch(err => console.log(err))
  }
  handleRelaodWeek(event) {
    refreshWeekMovements()
      .then(data => this.setState({ weekMovements: data }))
  }
  render() {
    const { classes } = this.props
    const { selectedDate, renderCharts, dataTemperatures, weekMovements } = this.state
    return (
      <Grid item container spacing={5} justify="center" alignItems='center' lg={9} xs={12} >
        {/* Chart */}
        < Grid item xs={9} md={9} lg={9} >
          <Paper className={clsx(classes.paper, classes.height)}>
            <Chart
              xVar="time"
              yVar="temps"
              yVar2="humidity"
              render={renderCharts}
              data={dataTemperatures}
            />
          </Paper>
        </Grid>
        {/* Selezione giorno da visualizzare sul grafo */}
        < Grid item xs={3} md={3} lg={3} ><>
          <Typography variant='overline'>Seleziona la data per visualizzare il rispettivo grafico</Typography>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker disableFuture={true} value={selectedDate} onChange={this.handleDateChange} variant="inline" format="DD/MM/YYYY"/>
          </MuiPickersUtilsProvider></>
        </Grid >
        {/* Recent Deposits */}
        < Grid item xs={12} md={6} lg={6} >
          <Paper className={classes.paper}>
            <Box m={6}>
              <OverrideOpening />
            </Box>
          </Paper>
        </Grid >
        <Grid item xs={12} md={6} lg={6} >
          <Paper className={classes.paper}>
            <Box m={1}>
              <WeatherUI />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <WeekHours
            listWeekMovement={weekMovements}
            handleReload={this.handleRelaodWeek}
          />
        </Grid>
      </Grid >
    )
  }
}
export default withStyles(styles)(Dashboard)