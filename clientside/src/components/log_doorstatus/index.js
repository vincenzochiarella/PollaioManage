import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

class DoorStatus_Log extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            logView: []
        }
    }

    componentWillMount(){
        getDoorStatusLog().then(data => this.setState({logView: data}))
    }

    render(){
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Data e Orario</TableCell>
                        <TableCell align="right">Transizione</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.logView.map(row=> (
                        <TableRow>
                            <TableCell>{row.date_time}</TableCell>
                            <TableCell>{row.before_status} --> {row.next_status}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
                       
        )
    }

}