import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListEntry from "./ListEntry";




class App extends React.Component{



  render() {


    return(


        <section>
          <h1>To Do List</h1>
          <Button variant="outlined" color="primary" >Add</Button>
          <ListEntry/>



        </section>


    )
  }
}
export default App;
