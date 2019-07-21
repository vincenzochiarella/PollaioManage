import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import moment from 'moment'
import { getDoorStatusLog } from '../controllers/DoorController'

class DoorStatus_Log extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            logView: []
        }
    }
    getMove( move ){
        switch (move) {
            case 0:
                return 'Chiusura'                
            case 1:
                return 'Apertura'            
            default:
                break;
        }
    }
    componentWillMount(){
        getDoorStatusLog().then(data => this.setState({logView: data}))
    }

    render(){
        const { logView } = this.state
        return(
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Data e Orario</TableCell>
                        <TableCell align="center">Transizione</TableCell>
                        <TableCell align="right"> Autorizzazione </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logView.map((row,index)=> (
                        <TableRow key={row.id}>
                            <TableCell>{moment(row.createdAt).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                            <TableCell>{this.getMove(row.movement)}</TableCell>
                            <TableCell>{row.user_authorized}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                       
        )
    }

}
export default DoorStatus_Log