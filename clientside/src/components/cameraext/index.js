import React from 'react'

import { Box, Paper } from '@material-ui/core'

import * as socketIo from 'socket.io-client'




class ExternalCamera extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            socket: socketIo('http://localhost:5000')
        }
        this.updateImage = this.updateImage.bind(this)
    }
    componentDidMount() {
        this.updateImage()
    }
    updateImage() {
        var img = document.getElementById('externalcam')
        var soc = this.state.socket 
        try {
            soc.on('data', function (data) {
                img.src = 'data:image/png;base64,' + data
            })
        }catch(err){
            soc.close()
            console.log('non è stato possibile connettersi')
       }      
    }
    componentWillUnmount(){
        this.state.socket.close()
    }

    render() {
        return (
            <>
                <Box p={8}>
                    <Paper style={{ minWidth: '30vh' }}>
                        <Box p={2}>
                            <img id="externalcam" alt='Video attualmente non disponibile' style={{
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