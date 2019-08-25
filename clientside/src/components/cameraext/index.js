import React from 'react'

import { Box, Paper, Grid } from '@material-ui/core'

import * as socketIo from 'socket.io-client'




class ExternalCamera extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: socketIo(`${window.location.href}/extcam`)
        }
        this.updateImage = this.updateImage.bind(this)
    }
    componentDidMount() {
        this.updateImage()
    }
    updateImage() {
        var img = document.getElementById('externalcam')

        this.state.socket.on('data', function (data) {
            img.src = 'data:image/png;base64,' + data
        })
    }
    componentWillUnmount() {
        this.state.socket.close()
    }

    render() {
        return (
            <Grid item >
                <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                    <Box m={4}>
                        <img id="externalcam" alt='Video attualmente non disponibile' style={{                            
                            width: '100%',
                            maxWidth: '1280px',
                            height: 'auto'
                        }} />
                    </Box>
                </Paper>


            </Grid>


        );
    }

}

export default ExternalCamera