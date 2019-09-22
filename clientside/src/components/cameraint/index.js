import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'



class CameraInternal extends React.Component {
    render() {
        return (
            <>
                <Grid item container justify='center' alignItems='center'>
                    <Paper style={{ minWidth: '40vh', minHeight: '30vh' }}>
                        <Box m={4}>
                            <Grid item container justify='center' alignItems='center'>
                                <Grid item>
                                    <script src="jsmpeg.min.js"></script>
                                    <div class="jsmpeg" data-url={`wss:${window.location.href.slice(0, -9).slice(6)}/intcam`}></div>
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