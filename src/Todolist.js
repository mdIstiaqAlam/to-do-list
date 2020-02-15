import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {shadows} from '@material-ui/system';

function Todolist(props) {
    const notes = props.notes;
    const searchNotes = props.searchNote;
    var selected = props.tempIndex;
    var bgcolor = '#B0E0E6';
    var selectButton = "Select";

    const todoList = notes.map((note, index) => {

            if (index === selected) {
                bgcolor = '#E0FFFF';
                selectButton = "Unselect";
            } else {
                bgcolor = '#B0E0E6';
                selectButton = "Select";
            }


            if (searchNotes === "" || searchNotes === note.note) {
                var cname = "";
                if (note.conname != "") {
                    cname = "Contributor: " + note.conname
                }
                return (
                    <Box boxShadow={2} style={{padding: '10px', margin: '5px'}} bgcolor={bgcolor} className="list"
                         key={note.key}>
                        <Container>
                            <p><Checkbox color="default"
                                         value="default"/>{note.note}

                            </p>
                            <p align="right">{cname}</p>
                        </Container>
                        <Container>
                            <Button style={{float: 'left', marginRight: '10px'}} variant="contained"
                                    onClick={() => props.editNote(index)}>Edit</Button>
                            <Button variant="contained" onClick={() => props.deleteNote(index)}>Delete</Button>
                            <Button style={{float: 'right'}} variant="contained"
                                    onClick={() => props.selectNote(index)}>{selectButton}</Button>

                        </Container>
                    </Box>
                )
            }


        }
    );
    return (
        <div>{todoList}</div>
    );

}

export default Todolist;