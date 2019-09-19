import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'


class CameraInternal extends React.Component {

    constructor(props) {
        super(props)
        this.updateImage = this.updateImage.bind(this)
    }

    componentDidMount() {
        var img = document.getElementById('internalcam')
        const wsUrl = window.location.href.slice(0, -9).slice(5)
        var ws = new WebSocket('ws:' + wsUrl + `/intcam`);

        console.log('ws:' + wsUrl + `/intcam`)
        ws.onmessage = function (event) {
            setInterval(console.log(event.data), 2000)
        }
        
        
        const script = document.createElement("script");
        script.src = "./jsmpeg.min.js";    
        document.body.appendChild(script);
        var player = new JSMpeg.Player(ws, { canvas: img })
    }

    render() {
        return (
            <>
                <Grid item container justify='center' alignItems='center'>
                    <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                        <Box m={4}>
                            <Grid item container justify='center' alignItems='center'>
                                <Grid item>
                                    <canvas id="internalcam"></canvas>
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