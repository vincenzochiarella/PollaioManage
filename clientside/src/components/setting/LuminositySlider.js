import React from 'react'
import { Typography, Slider, withStyles } from '@material-ui/core'

import { setLumsetting, getLumsetting } from '../../controllers/ChickenHouseController'

const style = theme => ({
    root: {
        width: 300,
    },
    margin: {
        height: theme.spacing(3),
    },
})
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

    componentWillMount(){
        this.query()
    }

    query(){
        getLumsetting().then(data=>{
            this.setState({
                lumMinimum: data.lumMin,
                sensibility: data.lumSensibility
            })
        }).catch(err=>console.log(err))
    }
    
    handleSlideLum =  (event, value) =>{
        this.setState({
            lumMinimum: value
        })
        setLumsetting(this.state.lumMinimum, this.state.sensibility)
        .then()
        .catch(err=>console.log(err))
        event.preventDefault()
    }
    handleSlideSens=  (event, value) =>{
        this.setState({
            sensibility: value
        })
        setLumsetting(this.state.lumMinimum, this.state.sensibility)
        .then()
        .catch(err=>console.log(err))
        event.preventDefault()
    }



    render() {
        const { classes } = this.props
        const { lumMinimum , sensibility} = this.state
        return (<>
            <div className={classes.root}>            
                <Typography id="lumMinima" gutterBottom>
                    Soglia chiusura (Lux)
                </Typography>
                <Slider
                    value={lumMinimum}
                    step={1000}
                    marks={lumValue}
                    onChange={this.handleSlideLum}
                    max={17000}
                    min={1000}
                    valueLabelDisplay="auto"
                />
                <div className={classes.margin} />
                <Typography id="Sensibilità" gutterBottom>
                    Sensibilità rilevamento sensore
                </Typography>
                <Slider
                    value={sensibility}
                    step={10}
                    max={60}
                    min={10}
                    marks={senMarker}
                    onChange={this.handleSlideSens}
                    valueLabelDisplay="auto"
                />
                <div className={classes.margin} />
            </div>

        </>)
    }
}
export default withStyles(style)(LumSettings)