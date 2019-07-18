import React from 'react'
import { Edit, Remove } from '@material-ui/icons'
import { TableRow, TableCell, Button, Select, MenuItem, InputLabel } from '@material-ui/core'

import DateTimePickers from './DateTimePickers'

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
    }
    getButType() {
        if (this.state.editMode)
            return "outlined"
        else
            return "contained"
    }
    onToggleSwitch = event => {        
        this.setState({
            editMode: true
        })
        if(this.state.editMode)
            this.props.update(this.state.id, this.state.date, this.state.move)
        event.preventDefault()
    }
    updateDateTime(date) {
        this.setState({
            date: date
        })
    }
    onChangeMove(move) {
        this.setState({
            move: move
        })
    }
    onClickDelete(){
        this.props.delete(this.state.id)
    }

    render() {
        const { id, editMode, date, move, status } = this.state
        return (
            <TableRow key={id}>
                {!editMode ? <>
                    <TableCell>
                        {date}
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
                            <Select onChange={this.onChangeMove} required>
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
                        variant={this.getType()}
                        onClick={this.onToggleSwitch}
                    >
                        <Edit/>
                    </Button>
                </TableCell>
                <TableCell>
                    <Button 
                        onClick={this.onClickDelete}>
                            <Remove/>
                        </Button>
                </TableCell>
                
            </TableRow>
        )
    }

}

export default SchedulerRow