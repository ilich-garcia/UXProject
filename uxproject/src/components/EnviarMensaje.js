import React, { Component } from "react";
import "../bootstrap.min.css";
import firebase from "firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import fire from '../firebase/firebase';
import SimpleSnackBar from './SnackBar';


import { UserProfile } from "./UserProfile";
import { TextField } from "@material-ui/core";

//import DeleteIcon from "@material-ui/icons/Delete";
//import FilterListIcon from "@material-ui/icons/FilterList";
//import { firebase } from "@firebase/app";


class EnviarMensaje extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;

        this.state = {
            user: null,
            open: false,
            nombre: "",
            nombreEdit: "",
            carrera: "",
            carreraStatic: "",
            emailStatic: "",
            email: "",
            clases: [],
            select: '',
            myClasses: [],

        };
        //this.addClasses = this.addClasses.bind(this);
        this.renderList = this.renderList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.testMethod = this.testMethod.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.checkIfExists = this.checkIfExists.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }

    sendMessage(){

    }



    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };



   

    testMethod() {
        console.log(this.state.select);
    }



    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };



    checkIfExists() {//se puede utilizar para saber si el usuario es tutor o alumno
        var userID = fire.auth().currentUser.uid;
        var ref = fire.database().ref().child("users");
        //var refTeachers = fire.database().ref().child("users/teachers");

        /*
        refTeachers.once("value").then(snapshot => {
            if(snapshot.child(userID).exists()){
                //es tutor
                //this.setState({tipoCuenta : 'tutor'});
            }else{
                //es alumno
            }
        });*/

        ref.once("value").then(snapshot => {
            if (snapshot.child(userID).exists()) {
                console.log("existe usuario");
            } else {
                console.log("not exists");
            }
        });
    }




    componentDidMount() {
        let currentComponent = this;




        firebase.auth().onAuthStateChanged(user => {

        });


    }

    componentWillUnmount() {

    }



    renderList() {
        return this.state.clases.map(el => {
            return <ListItem primarytext={el.nombre} key={el.idClase} />
        })
    }



    //obtener los datos del usuario logged in en el componentWillMount y cambiar el state
    render() {


        const { classes } = this.props;
        const { dense, secondary } = this.state;
        //var names = ['Calculo', 'Trigonometria', 'IDK'];
        return (

            <div>
                <div className="jumbotron">
                    <h1>Enviar un mensaje {this.state.nombre}</h1>
                    <p>destinatario: </p>
                </div>

                <div className="container">

                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="5" id="comment"></textarea>
                    </div>
                    {/*
                    <TextField
                        hintText="MultiLine with rows: 2 and rowsMax: 4"
                        multiLine={true}
                        rows={2}
                        rowsMax={4}
                        onChange = {() => this.handleChange('mensaje')}
                    />
*/}




                    <Grid container spacing={16}>

                        <Grid item xs={12} md={6}>
                            

                        </Grid>

                    </Grid>



                    <br /><button onClick={() => this.sendMessage()} type="button" className="btn btn-primary">Enviar Mensaje</button>
                    <br />
                </div>


            </div>
        );

    }

}


export default EnviarMensaje;
