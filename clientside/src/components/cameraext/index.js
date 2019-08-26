import React from 'react'

import { Box, Paper, Grid } from '@material-ui/core'
import { RingLoader } from 'react-spinners'

import * as socketIo from 'socket.io-client'
import { mergeClasses } from '@material-ui/styles';




class ExternalCamera extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.updateImage = this.updateImage.bind(this)
    }

    componentDidMount() {
        this.updateImage()
    }
    updateImage() {
        var img = document.getElementById('externalcam')
        var soc = socketIo(`${window.location.href}`.slice(0, -9) + '/streamext')
        this.setState({
            socket: soc
        })
        console.log(`${window.location.href}`.slice(0, -9) + '/streamext')
        soc.on('data', function (data) {
            img.src = 'data:image/png;base64,' + data
        })
    }
    componentWillUnmount() {
        this.state.socket.close()
    }

    render() {
        return (
            <Grid item container justify='center' alignItems='center' >
                <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                    <Box m={4}>
                        <Grid item container justify='center' alignItems='center'>
                            <Grid item>
                                {document.getElementById('externalcam').src &&
                                    <RingLoader
                                        sizeUnit={"vh"}
                                        size={6}
                                        color={'#ff9800'}
                                    />
                                }</Grid>
                            <Grid item>
                                <img id="externalcam" alt='Video attualmente non disponibile' style={{
                                    width: '100%',
                                    maxWidth: '1280px',
                                    height: 'auto'
                                }} />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>


        );
    }

}

export default ExternalCamera