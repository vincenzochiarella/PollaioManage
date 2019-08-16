import React from 'react'
import { Box, Paper } from '@material-ui/core'

import * as socketIo from 'socket.io-client'



class CameraInternal extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            socket: socketIo('http://localhost:5000/intcam')
        }
        this.updateImage = this.updateImage.bind(this)
    }
    updateImage() {
        var img = document.getElementById('internalcam')
        var soc = this.state.socket
        soc.on('data', function (data) {
            img.src = 'data:image/png;base64,' + data
        })
    }
    componentDidMount() {
        this.updateImage()
    }
    componentWillUnmount(){
        this.state.socket.close()
    }
    render() {
        return (
            <>
                <Box p={8}>
                    <Paper style={{ minWidth: '30vh' }}>
                        <Box p={2}>
                            <img id="internalcam" alt='Video attualmente non disponibile' style={{
                                width: '100%',
                                maxWidth: '1280px',
                                height: 'auto'
                            }} />
                        </Box>
                    </Paper>
                </Box>
            </>
        )
    }
}
export default CameraInternal