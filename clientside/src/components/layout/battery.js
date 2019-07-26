import React from 'react'
import { Battery80Outlined, Battery60Outlined, Battery40Outlined, Battery20Outlined, BatteryFullOutlined, BatteryAlert } from '@material-ui/icons'
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
                level: data
            })
        }).catch(err => console.log(err))
    }
    componentWillMount() {
        this.checkBattery()
        this._isMounted = true
    }
    componentWillUpdate() {
        if (this._isMounted) {
            setInterval(this.checkBattery(), 30000)
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    getIcon() {
        const { level } = this.state
        if (level === 100) {
            return <BatteryFullOutlined />
        }
        else if ((level >= 80) && (level < 100)) {
            return <Battery80Outlined />
        }
        else if ((level >= 60) && (level < 80)) {
            return <Battery60Outlined />
        }
        else if ((level >= 40) && (level < 60)) {
            return <Battery40Outlined />
        }
        else if ((level >= 20) && (level < 40)) {
            return <Battery20Outlined />
        }
        else if ((level >= 0) && (level < 20)) {
            return <BatteryAlert />
        }
    }

    render() {
        return (
            <>
                <Paper>
                    <Box>
                        <Grid container direction='row'>
                            <Grid item>
                                {this.getIcon}
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