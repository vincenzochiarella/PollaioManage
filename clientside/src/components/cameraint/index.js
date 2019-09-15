import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'
//import { RingLoader } from 'react-spinners'


// import * as socketIo from 'socket.io-client'




class CameraInternal extends React.Component {

    constructor(props) {
        super(props)

        this.updateImage = this.updateImage.bind(this)
    }
    updateImage() {
        

        // var soc = socketIo(`${window.location.href}`.slice(0, -9) + '/streamint')
        // this.setState({
        //     socket: soc
        // })
        // console.log(`${window.location.href}`.slice(0, -9) + '/streamint')
        // soc.on('data', function (data) {
        //     img.src = 'data:image/png;base64,' + data
        // })
    }
    componentDidMount() {
        // var img = document.getElementById('internalcam')
        var url = 'ws://'+document.location.hostname+'/intcam';
        console.log(url)
    }
    // componentWillUnmount() {
    //     if (this.state.socket)
    //         this.state.socket.close()
    // }
    render() {
        var url = 'ws://'+document.location.hostname+'/intcam';
        return (
            <>
                <Grid item container justify='center' alignItems='center'>
                    <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                        <Box m={4}>
                            <Grid item container justify='center' alignItems='center'>
                                <Grid item>
                                    <div class="jsmpeg" data-url={url}></div>
                                    <canvas id="internalcam"  style={{
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