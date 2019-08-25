import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'

import * as socketIo from 'socket.io-client'



class CameraInternal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: socketIo(`${window.location.href}/intcam`)
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
    componentWillUnmount() {
        this.state.socket.close()
    }
    render() {
        return (
            <>
                <Grid item>
                    <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                        <Box m={4}>
                            <img id="internalcam" alt='Video attualmente non disponibile' style={{
                                width: '100%',
                                maxWidth: '1280px',
                                height: 'auto'
                            }} />
                        </Box>
                    </Paper>

                </Grid>
            </>
        )
    }
}
export default CameraInternal