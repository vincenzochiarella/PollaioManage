import React from 'react';


import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import { Fab, CircularProgress, withStyles, Grid, Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';

import { setDoorOpen, setDoorClose } from '../../controllers/DoorController'
import { getDoorstatus } from '../../controllers/ChickenHouseController'


const style = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(2),
        position: 'relative',
    },
    open: {
        color: green[500]
    },
    close: {
        color: red[700]
    },
    buttonOpen: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
        width: 140,
        height: 140
    },
    buttonClose: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
        width: 140,
        height: 140
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    }
})


class OverrideOpening extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            //salvare lo stato della porta per invertirla
            opened: false,
            //aspettare che la porta sia aperta o chiusa
            motion: false,

        }

    }
    onToggleSwitch = event => {
        // this.setState({ opened: !this.state.opened })
        if (this.state.opened) {
            setDoorClose('admin')
        } else {
            setDoorOpen('admin')
        }
        event.preventDefault()
    }


    componentWillMount() {
        this._isMounted = true;
        getDoorstatus().then(data => {
            if (data.doorStatus === 0 || data.doorStatus === 1) {
                this.setState({
                    opened: !!data.doorStatus,
                    motion: false
                })
            } else {
                this.setState({
                    motion: true
                })
            }
        })
    }
    componentWillUpdate() {
        setTimeout(() => {
            getDoorstatus().then(data => {
                if (data.doorStatus === 0 || data.doorStatus === 1) {
                    if (this._isMounted) {
                        this.setState({
                            opened: !!data.doorStatus,
                            motion: false
                        })
                    }
                } else {
                    if (this._isMounted) {
                        this.setState({
                            motion: true
                        })
                    }
                }
            })
        }, 1000);

    }
    componentWillUnmount() {
        this._isMounted = false;
    }



    render() {
        const { opened, motion } = this.state;
        const { classes } = this.props;
        return (
            <Grid container >
                <Grid item lg={8} sm={9}>
                    <div className={classes.root}>
                        <div className={classes.wrapper}>
                            <Fab
                                aria-label="Save"
                                color="primary"
                                className={clsx(opened ? classes.buttonOpen : classes.buttonClose)}
                                onClick={this.onToggleSwitch}
                                disabled={motion}
                            >
                                {opened ? <LockOpen style={{ width: 60, height: 60 }} /> : <Lock style={{ width: 60, height: 60 }} />}
                            </Fab>
                            {motion && <CircularProgress size={154} className={classes.fabProgress} />}
                        </div>
                    </div >
                </Grid>
                <Grid container item lg={4} sm={3} direction='column'>
                    <Grid item>
                        <Typography >Clicca sul bottone per chiudere o aprire la porta del pollaio</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.open}><LockOpen /> La porta é aperta</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.close}><Lock /> La porta é chiusa</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

}

export default withStyles(style)(OverrideOpening);