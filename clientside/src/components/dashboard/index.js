import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core'

import Chart from './GenericChart';
import OverrideOpening from '../overrideopening';
import WeekHours from './WeekHours';
import WeatherUI from './WeatherUI'

import { getTemperatures } from '../../controllers/TempereturesController'

const useStyles = makeStyles(theme => ({
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
  height:{
    height: '300px'
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const paperCss = classes.paper
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={5} justify="center">
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={clsx(paperCss,classes.height)}>
            <Chart
              xVar="time"
              yVar="temps"
              yVar2="humidity"
              query={getTemperatures}
            />
          </Paper>
        </Grid>

        {/* Recent Deposits */}
        <Grid item xs={12} md={6} lg={6} >
          <Paper className={paperCss}>
            <Box m={6}>
              <OverrideOpening />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6} >
          <Paper  className={paperCss}>
            <Box m={1}>
              <WeatherUI/> 
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <WeekHours />
        </Grid>
      </Grid>
    </Container>

  );
}