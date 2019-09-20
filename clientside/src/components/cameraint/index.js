import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'
import jsmpeg from 'jsmpeg'


class CameraInternal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ws: null
        }
    }
    componentWillMount() {
        // var img = document.getElementById('internalcam')
        const wsUrl = window.location.href.slice(0, -9).slice(5)
        this.setState({
            ws: 'ws:' + wsUrl + `/intcam`
        }) 
    }

    render() {
        const { ws } = this.state
        return (
            <>
                <Grid item container justify='center' alignItems='center'>
                    <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                        <Box m={4}>
                            <Grid item container justify='center' alignItems='center'>
                                <Grid item>
                                    <script src="jsmpeg.min.js"></script>
                                    <div class="jsmpeg" data-url={ws}></div>
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