import React from 'react';


import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import IconButton from '@material-ui/core/IconButton';



class OverrideOpening extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //salvare lo stato della porta per invertirla
            opened: false,
            //aspettare che la porta sia aperta o chiusa
            motion: false
        }
        this.onToggleSwitch = this.onToggleSwitch.bind(this)
    }
    getDoorPosition() {
        return this.state.opened
    }
    setDoorPosition() {
        //leggere lo status dei finecorsa da arduino (possibile utilizzo di express)
        this.setState({
            //TODO da modificare quando implementato
            opened: !this.state.opened
        })
    }
    onToggleSwitch = event => {
        this.setState({ opened: !this.state.opened})

    }

    componentDidMount() {
        this.setDoorPosition()
    }

      
    render() {
        const { opened } = this.state;

        return (
            <>
                <IconButton
                    onClick={this.onToggleSwitch}>
                    {opened ? <Lock size={100} /> : <LockOpen size={100}/>}
                </IconButton>


            </>
        )
    }

}

export default OverrideOpening;