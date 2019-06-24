import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Chart from './temperatureCharts';
import OverrideOpening from '../overrideopening';


import WeekHours from '../calcSunsetSunrise/listWeekDay';

const coords = { lat: 43.1386, log: 13.0678 };

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
      <Container maxWidth="lg" className={classes.container}>

        <Grid container spacing={5}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>


          {/* Recent Deposits */}
          <Grid item xs={3} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <OverrideOpening />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <WeekHours
              coords={coords}
            />


          </Grid>
        </Grid>
      </Container>

  );
}