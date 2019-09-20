import React from 'react'

import {
    Switch, FormControl, FormControlLabel, FormLabel, FormHelperText,
} from '@material-ui/core'
import { getAutomatism, setAutomatism } from '../../controllers/ChickenHouseController'
import LumSlider from './LuminositySlider'
class SettingPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automaticSun: false,
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
            .catch(err => console.log(err))
    }

    handleChange = event => {
        this.setState({
            automaticSun: !this.state.automaticSun,
            automaticLum: !this.state.automaticLum
        })
        event.preventDefault()
        setAutomatism(+!this.state.automaticSun, +!this.state.automaticLum)
            .then(res => {})
    };
    handleGetLumAutomatism
    render() {
        const { automaticLum, automaticSun } = this.state
        return (<>
            <FormControl>
                <FormLabel component="legend"  >Pannello di controllo automatismo</FormLabel>
                <FormControlLabel
                    control={
                        <Switch checked={automaticSun} onClick={this.handleChange} />
                    }
                    label="Apertura automatica con calendario solare"
                />
                <FormControlLabel
                    control={
                        <Switch checked={automaticLum} onClick={this.handleChange} />
                    }
                    label="Apertura automatica a seconda della luminosità"
                />
                <FormHelperText>Attenzione! Quando si seleziona un opzione l'altra si disattiva per evitare problemi 
                                Se l'opzione "Con calendario solare" é attiva ogni notte all'1, vengono sincronizzate Apertura e Chiusura</FormHelperText>

            </FormControl>
            {automaticLum && <LumSlider />}
        </>
        )
    }
}
export default SettingPanel