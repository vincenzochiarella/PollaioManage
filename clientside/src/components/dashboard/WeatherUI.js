import React from 'react'
import {
    Grid, withStyles, Typography
} from '@material-ui/core'
import { getLastWeatherUpdate } from '../../controllers/TempereturesController'

const style = theme => ({
    image: {
        width: 256,
        height: 256
    }

})
class WeatherUI extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            weather: null
        }
    }
    componentWillMount() {
        getLastWeatherUpdate().then(data =>{
            this.setState( data )
        }).catch(err =>{
            console.log(err)
        })

    }
    render() {

        const celsius = '°'
        const bar = 'bar'
        const perc = '% di Umidità'
        const percClouds = '% Coperto'
        const url = 'http://openweathermap.org/img/wn/'+this.state.iconCode+'@2x.png'
        return (
            <Grid container spacing={2}>
                <Grid item>
                     <img className={this.image} alt="IconaMeteo" src={url} style={{width: 150, height: 150}}></img> 
                </Grid>
                <Grid item xs={12} sm container >
                    <Grid item xs container direction="column" spacing={1}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h2" color="primary">
                                {this.state.temps}{celsius}
                            </Typography>
                            <Typography variant="h4">
                                {this.state.pressure}{bar}
                            </Typography>
                            <Typography variant="h5" color="textSecondary">
                                {this.state.humidity}{perc}
                            </Typography>
                            <Typography variant="h5" color="secondary">
                                {this.state.clouds}{percClouds}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
 
}

export default withStyles(style)(WeatherUI)