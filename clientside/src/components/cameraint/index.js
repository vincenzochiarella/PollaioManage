import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'
import { RingLoader } from 'react-spinners'

import * as socketIo from 'socket.io-client'



class CameraInternal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.updateImage = this.updateImage.bind(this)
    }
    updateImage() {
        var img = document.getElementById('internalcam')
        var soc = socketIo(`${window.location.href}`.slice(0,-9)+'/streamint')
        this.setState({
            socket: soc
        })
        console.log(`${window.location.href}`.slice(0,-9)+'/streamint')
        soc.on('data', function (data) {
            this.setState({ loading: false })
            img.src = 'data:image/png;base64,' + data
        })
    }
    componentDidMount() {
        this.updateImage()
    }
    componentWillUnmount() {
        if (this.state.socket)
            this.state.socket.close()
    }
    render() {
        const { loading } = this.state
        return (
            <>
                <Grid item container justify='center' alignItems='center'>
                    <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                        <Box m={4}>
                        <Grid item container justify='center' alignItems='center'>
                            <Grid item>
                                {loading &&
                                    <RingLoader
                                        sizeUnit={"vh"}
                                        size={6}
                                        color={'#ff9800'}
                                    />
                                }</Grid>
                            <Grid item>
                                <img id="internalcam" alt='Video attualmente non disponibile' style={{
                                    width: '100%',
                                    maxWidth: '1280px',
                                    height: 'auto'
                                }} />
                            </Grid>
                        </Grid>
                        </Box>
                    </Paper>

                </Grid>
            </>
        )
    }
}
export default CameraInternal