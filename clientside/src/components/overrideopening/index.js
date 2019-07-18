import React from 'react';


import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import IconButton from '@material-ui/core/IconButton';

import { setDoorOpen, setDoorClose } from '../controllers/DoorController'
import { getDoorstatus } from '../controllers/ChickenHouseController'


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
    onToggleSwitch = event => {
        this.setState({ opened: !this.state.opened })
        if(this.state.opened){
            setDoorClose('admin')
        }else{
            setDoorOpen('admin')            
        }
        event.preventDefault()
    }


    componentWillMount() {
        getDoorstatus().then(data => {
            if (data.doorStatus === 0 || data.doorStatus === 1){
                this.setState({
                    opened: !!data.doorStatus,
                    motion: false
                })
            }else{
                this.setState({
                    motion: true
                })
            }
        })
    }
    componentWillUpdate(){
        getDoorstatus().then(data => {
            if (data.doorStatus === 0 || data.doorStatus === 1){
                this.setState({
                    opened: !!data.doorStatus,
                    motion: false
                })
            }else{
                this.setState({
                    motion: true
                })
            }
        })
    }


    render() {
        const { opened, motion } = this.state;

        return (
            <>
                <IconButton style={{ width: 100, height: 100 }}
                    onClick={this.onToggleSwitch}
                    disabled={motion}>
                    {opened ? <Lock style={{ width: 60, height: 60 }} /> : <LockOpen style={{ width: 60, height: 60 }} />}
                </IconButton>
            </>
        )
    }

}

export default OverrideOpening;