import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'
import { RingLoader } from 'react-spinners'

import * as socketIo from 'socket.io-client'



class CameraInternal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            socket: socketIo(`${window.location.href}`),
            loading: true,

        }
        this.updateImage = this.updateImage.bind(this)
    }
    updateImage() {
        var img = document.getElementById('internalcam')
        var soc = this.state.socket
        soc.on('data', function (data) {
            img.src = 'data:image/png;base64,' + data
            this.setState({ loading: false })
        })
    }
    componentDidMount() {
        this.updateImage()
    }
    componentWillUnmount() {
        this.state.socket.close()
    }
    render() {
        const { loading } = this.state
        return (
            <>
                <Grid item container justify='center' alignItems='center'>
                    <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                        <Box m={4}>
                            {!loading &&
                                <img id="internalcam" alt='Video attualmente non disponibile' style={{
                                    width: '100%',
                                    maxWidth: '1280px',
                                    height: 'auto'
                                }} />}
                            {loading && <Grid item container justify='center' alignItems='center'>
                                <Grid item>
                                    <RingLoader
                                        sizeUnit={"vh"}
                                        size={6}
                                        color={'#ff9800'}
                                    />
                                </Grid>
                            </Grid>
                            }
                        </Box>
                    </Paper>

                </Grid>
            </>
        )
    }
}
export default CameraInternal