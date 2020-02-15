import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';


import Todolist from './Todolist';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            currentNote: {
                note: '',
                conname: '',
                key: ''
            },
            addPopVisibility: false,
            editPopVisibility: false,
            tempIndex: -1,
            searchNote: ''
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.selectNote = this.selectNote.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);


    }


    handleClose() {
        this.setState({addPopVisibility: !this.state.addPopVisibility})
    }

    handleEditClose() {         //Edit pop up close
        this.selectNote(this.state.tempIndex);
        this.setState({editPopVisibility: !this.state.editPopVisibility});
        this.setState({
            currentNote: {
                note: '',
                conname: '',
                key: ''
            }
        })
    }

    deleteNote(NoteIndex) {
        const notes = this.state.notes;
        notes.splice(NoteIndex, 1);
        this.setState({
            notes: notes,
            tempIndex: -1,
            currentNote: {
                note: '',
                conname: '',
                key: ''
            }
        })
    }

    selectNote(index) {
        if (this.state.tempIndex >= 0 && this.state.tempIndex <= this.state.notes.length - 1) {
            this.setState({
                tempIndex: -1
            })
        } else {
            this.setState({
                tempIndex: index
            })
        }
    }

    moveUp() {
        if (this.state.tempIndex <= 0) {
            return;
        }
        const notes = this.state.notes;
        const tempNote = notes[this.state.tempIndex];

        //exchange list position
        notes[this.state.tempIndex] = notes[this.state.tempIndex - 1];
        notes[this.state.tempIndex - 1] = tempNote;
        this.setState({
            tempIndex: this.state.tempIndex - 1,
            notes: notes

        });
    }

    moveDown() {
        if (this.state.tempIndex >= this.state.notes.length - 1) {
            return;
        }
        console.log(this.state.tempIndex);
        console.log(this.state.notes.length);
        const notes = this.state.notes;
        const tempNote = notes[this.state.tempIndex];

        //exchange list position
        notes[this.state.tempIndex] = notes[this.state.tempIndex + 1];
        notes[this.state.tempIndex + 1] = tempNote;
        this.setState({
            tempIndex: this.state.tempIndex + 1,
            notes: notes

        });
    }

    editNote(NoteIndex) {           //open edit note pop-up
        this.setState({
            editPopVisibility: !this.state.editPopVisibility,
            tempIndex: NoteIndex,
            currentNote: {
                note: this.state.notes[NoteIndex].note,
                conname: this.state.notes[NoteIndex].conname,
                key: this.state.notes[NoteIndex].key
            }
        })


    }

    saveEdit() {                //save button edit not pop-up
        if (this.state.tempIndex > -1) {
            const notes = this.state.notes;
            notes[this.state.tempIndex] = this.state.currentNote;
            this.setState({
                notes: notes,
            });
        }
        this.selectNote(this.state.tempIndex);
        this.handleEditClose();

    }


    toggleVisibility = () => {
        this.setState({addPopVisibility: !this.state.addPopVisibility})
    }

    addNote(e) {
        e.preventDefault();
        const newNote = this.state.currentNote;
        if (newNote.note !== "") {
            const notes = [...this.state.notes, newNote];
            this.setState({
                notes: notes,
                currentNote: {
                    note: '',
                    conname: '',
                    key: ''
                }
            })
        }
        this.handleClose()

    }


    render() {
        return (


            <Container style={{border: '5px', paddingLeft: '25%', paddingRight: '25%'}}>
                <h1 style={{textAlign: 'center'}}>To Do List</h1>

                <Container style={{marginBottom: "25px"}}>
                    <TextField
                        label="Search"
                        margin="dense"
                        id="standard-basic"
                        placeholder="Search"
                        type="text"
                        value={this.state.searchNote}
                        onChange={val => this.setState(
                            {searchNote: val.target.value})}
                        fullWidth
                    />
                </Container>
                <Container>
                    <Container>
                        <Button variant="outlined" color="primary" onClick={this.toggleVisibility}>
                            Add Task
                        </Button>
                        <Button style={{float: 'right', marginLeft: '4px'}} variant="outlined" color="primary"
                                onClick={this.moveDown}>
                            Down
                        </Button>
                        <Button style={{float: 'right', marginLeft: '4px'}} variant="outlined" color="primary"
                                onClick={this.moveUp}>
                            Up
                        </Button>
                    </Container>

                    <Dialog id="dialogue" open={this.state.addPopVisibility} onClose={this.handleClose}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus
                                       margin="dense"
                                       id="task"
                                       label="Task"
                                       placeholder="Task"
                                       type="text"
                                       value={this.state.currentNote.note}
                                       onChange={val => this.setState(
                                           {
                                               currentNote: {
                                                   note: val.target.value,
                                                   conname: this.state.currentNote.conname,
                                                   key: this.state.notes.length
                                               }
                                           })}
                                       fullWidth
                            />
                            <TextField

                                margin="dense"
                                id="contName"
                                label="Contributor"
                                placeholder="Contributor"
                                type="text"
                                value={this.state.currentNote.conname}
                                onChange={val => this.setState(
                                    {
                                        currentNote: {
                                            note: this.state.currentNote.note,
                                            conname: val.target.value,
                                            key: this.state.notes.length
                                        }
                                    })}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.addNote} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog id="editDialogue" open={this.state.editPopVisibility} onClose={this.handleClose}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus
                                       margin="dense"
                                       id="task"
                                       label="Task"
                                       placeholder="Task"
                                       type="text"
                                       value={this.state.currentNote.note}
                                       onChange={val => this.setState(
                                           {
                                               currentNote: {
                                                   note: val.target.value,
                                                   conname: this.state.currentNote.conname,
                                                   key: this.state.currentNote.key
                                               }
                                           })}
                                       fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="contName"
                                label="Contributor"
                                placeholder="Contributor"
                                type="text"
                                value={this.state.currentNote.conname}
                                onChange={val => this.setState(
                                    {
                                        currentNote: {
                                            note: this.state.currentNote.note,
                                            conname: val.target.value,
                                            key: this.state.currentNote.key
                                        }
                                    })}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleEditClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.saveEdit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Todolist tempIndex={this.state.tempIndex} searchNote={this.state.searchNote}
                              selectNote={this.selectNote} editNote={this.editNote} notes={this.state.notes}
                              deleteNote={this.deleteNote}/>

                </Container>
            </Container>
        )
    }
}

export default App;
