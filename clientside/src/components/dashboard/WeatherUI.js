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
            weather: null,
            iconCode: '01d'
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
            <Grid container justify='center' alignItems='center'>
                <Grid item lg={8} md={8} xs={9}>
                     <img className={this.image} alt="IconaMeteo" src={url} style={{width: '12vh', height: '12vh'}}></img> 
                </Grid>
                <Grid item lg={4} md={4} xs={3} container >
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