import React from 'react'
import { Box, Paper } from '@material-ui/core'

import * as socketIo from 'socket.io-client'



class CameraInternal extends React.Component {
    state = {
        endpoint: "http://localhost:5000/internalcam"
    }
    updateImage() {
        var img = document.getElementById('internalcam')
        var socket = socketIo(this.state.endpoint)
        try {
            socket.on('live-stream', function (data) {
                img.src = 'data:image/png;base64,' + data
            })
        } catch (err) {
            socket.close()
            console.log('non è stato possibile connettersi')
        }
    }
    componentDidMount() {
        this.updateImage()
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