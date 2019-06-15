

import React from 'react';

import Grid from '@material-ui/core/Grid';
// import Moment from 'moment';

// import Sun from '@material-ui/icons/Sun';
// import Moon from '@material-ui/icons/   ';
import moon from '../../resources/moon.png';
import sun from '../../resources/sunny.png';

var SunCalc = require('suncalc');

//TODO 
class Posizionedelsole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coords: this.props.coords,
            moon: null,
            sun: null
        }

    }
    getPosizoneLuna() {
        return SunCalc.getMoonPosition(new Date(), this.state.coords.lat, this.state.coords.log)
    }
    getPosizoneSole() {
        return SunCalc.getPosition(new Date(), this.state.coords.lat, this.state.coords.log)
    }

    render() {
        return (
            <>
                <Grid item xs>
                    {this.getPosizoneSole().altitude <= 0 ?
                        <img src={moon} alt={'Moon'} width={25} height={25} />
                        :
                        <img src={sun} alt={'Sun'} width={25} height={25} />}
                </Grid>
            </>
        )
    }
}
export default Posizionedelsole;