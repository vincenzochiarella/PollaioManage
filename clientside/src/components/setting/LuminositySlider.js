import React from 'react'
import { Typography, Slider, Grid } from '@material-ui/core'

import { setLumsetting, getLumsetting } from '../../controllers/ChickenHouseController'


const lumValue = [
    {
        value: 1000,
        label: '1000 Lux',
    },
    {
        value: 8000,
        label: '8000 Lux',
    },
    {
        value: 17000,
        label: '17000 Lux',
    },
];
const senMarker = [
    {
        value: 10,
        label: '10 Sec'
    },
    {
        value: 60,
        label: '1 Min'
    },
]

class LumSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lumMinimum: 0,
            sensibility: 0
        }
    }

    componentWillMount() {
        this.query()
    }

    query() {
        getLumsetting().then(data => {
            this.setState({
                lumMinimum: data.lumMin,
                sensibility: data.lumSensibility
            })
        }).catch(err => console.log(err))
    }

    handleSlideLum = (event, value) => {
        this.setState({
            lumMinimum: value
        })
        setLumsetting(this.state.lumMinimum, this.state.sensibility)
            .then()
            .catch(err => console.log(err))
        event.preventDefault()
    }
    handleSlideSens = (event, value) => {
        this.setState({
            sensibility: value
        })
        setLumsetting(this.state.lumMinimum, this.state.sensibility)
            .then()
            .catch(err => console.log(err))
        event.preventDefault()
    }



    render() {
        const { lumMinimum, sensibility } = this.state
        return (
            <Grid container direction='column' justify='center'>
                <Grid item>
                    <Typography id="lumMinima" gutterBottom>Soglia chiusura (Lux)</Typography>
                </Grid>
                <Grid item>
                    <Slider
                        value={lumMinimum}
                        marks={lumValue}
                        step={50}
                        onChangeCommitted={this.handleSlideLum}
                        max={2000}
                        min={50}
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item>
                    <Typography id="Sensibilità" gutterBottom>Sensibilità rilevamento sensore (espressa in secondi)</Typography>
                </Grid>
                <Grid item>
                    <Slider
                        value={sensibility}
                        step={10}
                        max={60}
                        min={10}
                        marks={senMarker}
                        onChangeCommitted={this.handleSlideSens}
                        valueLabelDisplay="auto"
                    />
                </Grid>
            </Grid>

        )
    }
}
export default LumSettings