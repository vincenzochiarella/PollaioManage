import React from 'react'

import {
    Switch, FormControl, FormControlLabel, FormLabel, FormHelperText,
} from '@material-ui/core'
import { getAutomatism, setAutomatism } from '../controllers/ChickenHouseController'

class SettingPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automaticSun: false ,
            automaticLum: false
        }
    }
    componentWillMount() {
        getAutomatism().then((data) => {            
             this.setState({
                 automaticSun: !!data.sun,
                 automaticLum: !!data.luminosity
             })
        })
        .catch(err=>console.log(err))
    }
    handleChange = name => event => {
        // this.setState({ [name]: event.target.checked });
        if (name === 'automaticSun' && event.target.checked) {
            this.setState({
                automaticSun: true,
                automaticLum: false
            })
        } else {
            this.setState({
                automaticSun: false,
                automaticLum: true
            })

        }
        event.preventDefault()
        setAutomatism(+!this.state.automaticSun, +!this.state.automaticLum)
        .then(res => {
                console.log(res)
            })
    };
    render() {
        const { automaticLum, automaticSun } = this.state
        return (
            <FormControl>
                <FormLabel component="legend"  >Pannello di controllo automatismo</FormLabel>
                <FormControlLabel
                    control={
                        <Switch checked={automaticSun} onChange={this.handleChange('automaticSun')} />
                    }
                    label="Apertura automatica con calendario solare"
                />
                <FormControlLabel
                    control={
                        <Switch checked={automaticLum} onChange={this.handleChange('automaticLum')} />
                    }
                    label="Apertura automatica a seconda della luminosità"
                />
                <FormHelperText>Attenzione! Quando si seleziona un opzione l'altra si disattiva per evitare problemi</FormHelperText>

            </FormControl>
        )
    }
}
export default SettingPanel