import React from 'react'

import { Box, Paper } from '@material-ui/core'

import * as socketIo from 'socket.io-client'




class ExternalCamera extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            socket: socketIo('http://localhost:5000')
        }
        this.updateImage = this.updateImage.bind(this)
    }
    componentDidMount() {
        this.updateImage()
    }
    updateImage() {
        var img = document.getElementById('img')
        this.state.socket.on('data', function (data) {
            img.src = 'data:image/png;base64,' + data
        })
    }
    render() {
        return (
            <>
                <Box p={8}>
                    <Paper style={{ minWidth: '30vh' }}>
                        <Box p={2}>
                            <img id="img" alt='video non disponibile' style={{
                                width: '100%',
                                maxWidth: '1280px',
                                height: 'auto'
                            }} />
                        </Box>
                    </Paper>
                </Box>
            </>
        );
    }

}

export default ExternalCamera