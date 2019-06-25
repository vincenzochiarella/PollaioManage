import React from 'react'
import socketIOClient from 'socket.io-client'



class CameraInternal extends React.Component {
    state = {
        endpoint:"http://localhost:8080/internalcam"
    }
    componentDidMount(){
        const socket = socketIOClient(this.state.endpoint)
        socket.on("internalcamstream",(data)=> console.log("dati dal socket server:", data))
    }
    render(){
        return(
        <>
            <div id="internalcamstream"/>
        </>        
        )
    }
}
export default CameraInternal