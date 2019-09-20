import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@material-ui/core'
import moment from 'moment'
import { RingLoader } from 'react-spinners'
import { getDoorStatusLog } from '../../controllers/DoorController'

class DoorStatus_Log extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logView: [],
            render: false
        }
    }
    getMove(move) {
        switch (move) {
            case 0:
                return 'Chiusura'
            case 1:
                return 'Apertura'
            default:
                break;
        }
    }
    componentWillMount() {
        getDoorStatusLog().then(data => this.setState({ logView: data, render: true }))
    }

    render() {
        const { logView, render } = this.state
        if (render)
            return (
                <Grid item lg={9} xs={12}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Data e Orario</TableCell>
                                <TableCell align="center">Transizione</TableCell>
                                <TableCell align="right"> Autorizzazione </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logView.map((row, index) => (
                                <TableRow key={row.id} selected={!!+(index % 2)}>
                                    <TableCell>{moment(row.createdAt).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                                    <TableCell>{this.getMove(row.movement)}</TableCell>
                                    <TableCell>{row.user_authorized}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            )
        else
            return (
                <RingLoader
                    sizeUnit={"vh"}
                    size={5}
                    color={'#ff9800'}
                />
            )

    }

}
export default DoorStatus_Log