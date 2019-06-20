import React from 'react';


import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import IconButton from '@material-ui/core/IconButton';

import * as DOOR_STATUS from '../../constants/doorstatus';



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
    changeStatus( ){
        switch( this.state.opened ){
            case true:
                console.log(this.state.opened)
                fetch('http://localhost:8080/led/'+ DOOR_STATUS.OPEN)
                .then(res => console.log('response: ', JSON.stringify(res)))
                .catch(console.error)
                break
            case false:
                console.log(this.state.opened)
                fetch('http://localhost:8080/led/'+ DOOR_STATUS.CLOSE)
                .then(res => console.log('response: ', JSON.stringify(res)))
                .catch(console.error)
                break
            default:
                break
        }
        
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
        this.changeStatus()
        event.preventDefault()

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