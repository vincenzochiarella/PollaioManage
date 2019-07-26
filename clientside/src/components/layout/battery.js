import React from 'react'
import { Battery90, Battery60, Battery30, Battery20, BatteryFull, BatteryAlert } from '@material-ui/icons'
import { getBatteryLevel } from '../controllers/BatteryController'
import { Paper, Grid, Box } from '@material-ui/core'

class Battery extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            level: 100
        }
        this.checkBattery = this.checkBattery.bind(this)
    }
    checkBattery() {
        getBatteryLevel().then((data) => {            
            this.setState({
                level: data.value
            })
        }).catch(err => console.log(err))
    }
    componentWillMount() {
        this.checkBattery()
        this._isMounted = true
    }
    componentWillUpdate() {
        if (this._isMounted) {
            setInterval(this.checkBattery, 30000)
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    getIcon() {
        const { level } = this.state
        if (level === 100) {
            return <BatteryFull />
        }
        else if ((level >= 90) && (level < 100)) {
            return <Battery90 />
        }
        else if ((level >= 60) && (level < 90)) {
            return <Battery60 />
        }
        else if ((level >= 30) && (level < 60)) {
            return <Battery30/>
        }
        else if ((level >= 20) && (level < 30)) {
            return <Battery20 />
        }
        else if ((level >= 0) && (level < 20)) {
            return <BatteryAlert />
        }
        console.log(level)
    }

    render() {
        return (
            <>
                <Paper>
                    <Box>
                        <Grid container direction='row'>
                            <Grid item>
                                {this.getIcon()}
                            </Grid>
                            <Grid item>
                                {this.state.level} %
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </>
        )
    }

}

export default Battery