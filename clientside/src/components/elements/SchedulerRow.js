import React from 'react'
import { Edit, Delete } from '@material-ui/icons'
import { TableRow, TableCell, Button, Select, MenuItem, InputLabel } from '@material-ui/core'

import DateTimePickers from './DateTimePickers'
import moment from 'moment'

class SchedulerRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
            id: this.props.row.id,
            date: this.props.row.date,
            move: this.props.row.move,
            status: this.props.row.status
        }
        this.updateDateTime = this.updateDateTime.bind(this)
    }
    getButType() {
        if (this.state.editMode)
            return "outlined"
        else
            return "contained"
    }
    onToggleSwitch = event => {        
        this.setState({
            editMode: !this.state.editMode
        })
        if(this.state.editMode){
            this.props.update(this.state.id, this.state.date, this.state.move)
        }
        event.preventDefault()
    }
    updateDateTime( date ) {
        this.setState({
            date: date
        })
    }
    onChangeMove = event => {
        this.setState({
            move: event.target.value
        })
        event.preventDefault()
    }

    onClickDelete(){
        this.props.delete(this.state.id)
    }

    render() {
        const { id, editMode, date, move, status } = this.state
        return (
            <TableRow key={id}>
                
                <TableCell>{id}</TableCell>
                {!editMode ? <>
                    <TableCell>
                        {moment(date).format('HH:mm DD-MM-YYYY')}
                    </TableCell>
                    <TableCell>
                        {move}
                    </TableCell>
                </> : <>
                        <TableCell>
                            <DateTimePickers
                                updateDateTime={this.updateDateTime}
                                date={date}
                            />
                        </TableCell>
                        <TableCell>
                            <InputLabel htmlFor="mossa"> Move </InputLabel>
                            <Select onChange={this.onChangeMove} value={this.state.move}>
                                <MenuItem value={0}>Chiudi</MenuItem>
                                <MenuItem value={1}>Apri</MenuItem>
                            </Select>
                        </TableCell>
                    </>}
                <TableCell>
                    {status}
                </TableCell>
                <TableCell>
                    <Button
                        variant={this.getButType()}
                        onClick={this.onToggleSwitch}
                        color="secondary"
                    >
                        <Edit/>
                    </Button>
                </TableCell>
                <TableCell>
                    <Button 
                        onClick={this.onClickDelete}
                        color="secondary">
                            <Delete/>
                        </Button>
                </TableCell>
                
            </TableRow>
        )
    }

}

export default SchedulerRow