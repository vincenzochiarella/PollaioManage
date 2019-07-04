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

import moment from 'moment'
import { getTemperatures } from '../controllers/TempereturesController'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    justifyItems: 'center',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const titleChart = "Temperature del " + moment(new Date()).format('DD-MM-YYYY')
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container maxWidth="lg" className={classes.container}>

      <Grid container spacing={5} justify="center">
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart
              title={titleChart}
              xVar="time"
              yVar="temps"
              query={getTemperatures}
            />
          </Paper>
        </Grid>

        {/* Recent Deposits */}
        <Grid item xs={3} md={4} lg={3} >
          <Paper className={fixedHeightPaper}>
            <Box m={6}>
              <OverrideOpening />
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