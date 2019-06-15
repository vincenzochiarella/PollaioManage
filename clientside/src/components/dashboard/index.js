import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// import Link from '@material-ui/core/Link';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Settings from '@material-ui/icons/Settings';
import Camera from '@material-ui/icons/Camera';
import CameraAlt from '@material-ui/icons/CameraAlt';
// import { mainListItems, secondaryListItems } from './listItems';

import Chart from '../charts/temperatureCharts';
import OverrideOpening from '../overrideopening';
// import Orders from './Orders';

import Posizionedelsole from './sunrisesunset';
import WeekHours from '../calcSunsetSunrise/listWeekDay';


import Clock from 'react-live-clock';
import { ListItem } from '@material-ui/core';

import * as Routes from '../../constants/routes';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const coords = { lat: 43.1386, log:  13.0678};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
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
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Home
              </Typography>

        <Paper >
              <Clock format={'HH:mm:ss A'} ticking={true}  />
            </Paper>
        
           
            
              <Posizionedelsole coords={coords} />
      
          

  
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >


        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem button component={Link} to={Routes.CameraInternal}>
            <ListItemIcon>
              <Camera />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h6" variant="h6" color="inherit" >
                Camera Interna
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button component={Link} to={Routes.CameraExternal}>
            <ListItemIcon>
              <CameraAlt />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h6" variant="h6" color="inherit" >
                Camera Esterna
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to={Routes.Setting}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h6" variant="h6" color="inherit" >
                Impostazioni
              </Typography>
            </ListItemText>
          </ListItem>
        </List>


      </Drawer>



      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
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
      </main>
    </div >
  );
}