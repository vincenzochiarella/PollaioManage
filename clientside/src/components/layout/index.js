import React from 'react';
import clsx from 'clsx';
import {
    Drawer, AppBar,
    Typography, Divider, List, ListItemIcon, ListItemText,
    IconButton, ListItem, withStyles, CssBaseline, Toolbar, Paper, Box
} from '@material-ui/core';

import {
    Camera,
    ChevronLeft,
    CameraAlt,
    Settings,
    Menu,
    BarChart,
    CalendarToday,
    Receipt
} from '@material-ui/icons/'


import { compose } from 'recompose';
import Posizionedelsole from './sunrisesunset'
import Battery from './battery'
import Clock from 'react-live-clock';
import { Link, withRouter } from 'react-router-dom';

import * as Routes from '../../constants/routes';


const drawerWidth = 240;

const coords = { lat: 43.1386, log: 13.0678 };

const styles = theme => ({
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
        position: 'float',
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
        justify: 'center',
        marginTop: "70px",   
    },
});

class Layout extends React.Component {
    state = {
        drawerOpen: false
    }

    handleDrawerClick = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    render() {
        const { classes, location: { pathname }, children } = this.props
        const { drawerOpen } = this.state

        const drawer = (
            <>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleDrawerClick}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <List>
                    <ListItem button component={Link}
                        to={Routes.Dashboard}
                        selected={Routes.Dashboard === pathname}
                    >
                        <ListItemIcon>
                            <BarChart />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography component="h6" variant="h6" color="inherit" >
                                Dashboard
                            </Typography>
                        </ListItemText>

                    </ListItem>
                    <ListItem button component={Link}
                        to={Routes.CameraInternal}
                        selected={Routes.CameraInternal === pathname}>
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
                    <ListItem button component={Link} to={Routes.Scheduler}>
                        <ListItemIcon>
                            <CalendarToday />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography component="h6" variant="h6" color="inherit" >
                                Schedulatore
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to={Routes.Logs}>
                        <ListItemIcon>
                            <Receipt />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography component="h6" variant="h6" color="inherit" >
                                Log
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
            </>
        )
        return <>
            <CssBaseline />
            <div className={classes.root}>

                <AppBar position="fixed" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerClick}
                            className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
                        >
                            <Menu />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            {pathname.substr(1)}
                        </Typography>

                        <Paper>
                            <Box m={1}>
                                <Clock format={'HH:mm:ss'} ticking={true} />
                            </Box>
                        </Paper>
                        <Paper>
                            <Box mt={1} ml={1} mr={1}>
                                <Posizionedelsole coords={coords} />
                            </Box>
                        </Paper>
                        <Battery/>
                    </Toolbar>
                </AppBar>
                <Drawer
                    // variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
                    }}
                    open={this.state.drawerOpen}
                >
                    {drawer}
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>

        </>

    }
}
export default compose(
    withStyles(styles),
    withRouter
)(Layout)