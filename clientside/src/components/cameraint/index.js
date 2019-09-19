import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'
import jsmpeg from 'jsmpeg'


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
        var img = document.getElementById('internalcam')
        const wsUrl = window.location.href.slice(0, -9).slice(5)
        var ws = new WebSocket('ws:' + wsUrl + `/intcam`);

        console.log('ws:' + wsUrl + `/intcam`)
        ws.onmessage = function (event) {
            console.log(event.data);
          }
        //const player = new jsmpeg(ws, { canvas: img })
    }

    render() {
        return (
            <>
                <Grid item container justify='center' alignItems='center'>
                    <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                        <Box m={4}>
                            <Grid item container justify='center' alignItems='center'>
                                <Grid item>
                                    <canvas id="internalcam" />
                                    {/* <canvas id="internalcam"  style={{
                                        width: '100%',
                                        maxWidth: '1280px',
                                        height: 'auto'
                                    }} /> */}
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