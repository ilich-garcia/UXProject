import React, { Component } from "react";
import "../bootstrap.min.css";
import PropTypes from 'prop-types';
import { auth } from '../firebase/firebase';
import firebase from "firebase";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import ProfileIcon from "@material-ui/icons/Portrait";
import AddIcon from '@material-ui/icons/Add';
import fire from '../firebase/firebase';
import SimpleSnackBar from './SnackBar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class ListMessages extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;

        this.state = {
            user: null,
            open: false,
            nombre: "",
            nombreEdit: "",
            carrera: "",
            email: "",
            clases: [],
            select: '',
            sendToID: "",
            sendToName: "",
            mensaje: "",
            tipoCuenta: "",
            seenMessageID: "",
            mensajes: []

        };

        this.handleChange = this.handleChange.bind(this);
        this.testMethod = this.testMethod.bind(this);
        this.testEditClasses = this.testEditClasses.bind(this);
        this.editClasses = this.editClasses.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.guardarCambios = this.guardarCambios.bind(this);
        this.openProfile = this.openProfile.bind(this);

    }

    addClass(newClass) {
        this.setState({ open: false });
        if (newClass !== "") {
            if (!this.state.myClasses.includes(newClass)) {
                var userId = fire.auth().currentUser.uid;
                var ref = fire.database().ref().child("users/" + userId);

                ref.once("value").then(function (snapshot) {
                    ref.child("tutClases").child(newClass).set(true);
                });
            } else {
                console.log("no se puede agregar clase existente");
            }
            //console.log("is in array? " + this.state.myClasses.includes(newClass));
            console.log("Clase: " + newClass);
        } else {
            console.log("havent selected item");
        }

    }


    handleClickOpen(messageID, sentMessageID, nombre) {

        this.setState({
            seenMessageID: messageID,
            sendToID: sentMessageID,
            sendToName: nombre
        });
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    editClasses() {
        let currentComponent = this;
        var userId = fire.auth().currentUser.uid;
        // e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        //fire.database().ref('messages').push(this.state.mensaje);
        var ref = fire.database().ref().child("users/" + userId);
        //var userposts = fire.database().ref().child("user-posts");

        /*ref.update({
            nombre: this.state.nombre,
            nombre: "Trigonometria"
        });*/

    }

    guardarCambios() {
        var userId = fire.auth().currentUser.uid;
        var ref = fire.database().ref().child("users/" + userId);

        ref.update({
            nombre: this.state.nombreEdit,
            email: this.state.email,
            carrera: this.state.carrera,
        });
    }

    deleteClass(classToDelete) {
        let currentComponent = this;
        var userId = fire.auth().currentUser.uid;

        var ref = fire.database().ref().child("users/" + userId);

        ref.once("value").then(function (snapshot) {
            if (snapshot.child("tutClases").child(classToDelete).exists()) {
                console.log("deleting " + classToDelete);
                ref.child("tutClases").child(classToDelete).remove();
            } else {
                console.log("doesnt exist");
            }
        });
    }

    testMethod() {
        console.log(this.state.select);
    }



    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };


    openProfile(data) {
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                const ref = fire.database().ref().child("usuarios/tutores/").child(data.uid).child("tutClases");
                /*
                                ref.on("value", snapshot => {
                                    let list = []
                                    snapshot.forEach(childSnapshot => {
                                        var key = childSnapshot.key;
                                        console.log(key);
                                        console.log(childSnapshot.val());
                                        list.push(key);
                
                                        this.setState({
                                            selectedProfileClases: list
                                        })
                                    })
                                });*/

                this.setState({
                    selectedProfile: data
                });

                this.setState({ open: true });
            }

        });




    }

    testEditClasses(e) {
        e.preventDefault();

        var ref = fire.database().ref().child("users/id0");


    }
    /* agregando algunas clases a la base de datos
        addClasses(e) {
            e.preventDefault(); // <- prevent form submit from reloading the page
    
            var ref = fire.database().ref().child("clases");
    
    
            ref.child("0").set({
                idClase: "0",
                nombre: "Algebra"
            });
            ref.child("1").set({
                idClase: "1",
                nombre: "Trigonometria"
            });
            ref.child("2").set({
                idClase: "2",
                nombre: "Calculo"
            });
    
    
        }*/



    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            // Cada vez que nos loggeemos o nos salgamos, el user tendrá información.
            if (user !== null) {
                this.setState({
                    user: user
                });

                var userID = firebase.auth().currentUser.uid;
                var ref1 = firebase.database().ref().child('usuarios').child('tutores');

                ref1.once("value").then(snapshot => {
                    if (snapshot.child(userID).exists()) {
                        console.log("uid: " + userID)

                        console.log("cuenta de tutor");
                        this.setState({
                            tipoCuenta: "tutor"
                        })
                    } else {
                        console.log("cuenta de alumno");
                        this.setState({
                            tipoCuenta: "alumno"
                        })
                    }
                });

                var refTutores1 = fire.database().ref().child("messages/" + user.uid);

                refTutores1.on("value", snapshot => {
                    let list = [];
                    snapshot.forEach(childSnapshot => {
                        //var key = childSnapshot.key;
                        //console.log(key);
                        //console.log(childSnapshot.val());
                        list.push(childSnapshot.val());
                        console.log(childSnapshot.val());

                        this.setState({
                            mensajes: list
                        })
                    })
                });

            } else {
                this.setState(
                    { user: null }
                )
            }
        });


    }

    componentWillUnmount() {

    }

    getNombreUser() {

    }

    sendMessage() {
        let currentComponent = this;
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                this.setState({ user: user });

                const messagesRef = firebase.database().ref().child("messages").child(this.state.sendToID);

                messagesRef.once("value").then(snapshot => {
                    messagesRef.child('notRead').once('value', childSnapshot => {
                        if (childSnapshot.exists()) {
                            //alert('exists');
                            let count = snapshot.val().notRead;
                            count++;

                            messagesRef.update({ notRead: count });
                        } else {
                            messagesRef.update({ notRead: 1 });
                        }
                    });

                    var key = messagesRef.push().getKey();

                    messagesRef.child(key).set({ notSeen: true, messageID: key, message: currentComponent.state.mensaje, sentBy: user.uid, type: this.state.tipoCuenta, nombre: user.displayName });

                });

                const mensajeLeidoRef = firebase.database().ref().child("messages").child(user.uid).child(this.state.seenMessageID);

                mensajeLeidoRef.once("value").then(snapshot => {
                    mensajeLeidoRef.child("notSeen").set(false);
                });

            }
        });



    }






    //obtener los datos del usuario logged in en el componentWillMount y cambiar el state
    render() {

        let data = this.state.mensajes.map((doc, i) => {
            return (

                <div key={i} id={i} className="card">
                    <div className="card-header">
                        <div className="grid-i">
                            <h4 style={{ textAlign: "left !important", fontSize: 1 + "rem" }} className="card-title">{doc.nombre}</h4>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{doc.message}</p>
                    </div>
                    <div className="text-right" style={{ marginRight: 1 + "%", marginBottom: 1 + "%" }}>
                        <button id={doc.sentBy} type="button" className="btn btn-outline-secondary  buttonPost" onClick={() => this.handleClickOpen(doc.messageID, doc.sentBy, doc.nombre)}> Responder </button>

                    </div>

                </div>



            )
        });

        return (

            <div id="Messages" className="Home">
                <div id="Desk">
                    <div id="board" className="card">
                        {data}
                    </div>
                    {/*this.renderLogginButton()*/}
                </div>



                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title" >


                    <div>
                        <div className="jumbotron">
                            <h1>Send message</h1>
                            <p>to: {this.state.sendTo}</p>

                            {/*<Link
                        to="/enviarMensaje"
                        style={{ color: "#fff", textDecoration: "none" }}
                    >
                        <Button onClick={() => this.sendMessage()} raised="true" type="button" className="btn btn-primary">Enviar mensaje </Button>
                    </Link>*/}


                        </div>
                        <div>
                            <TextField multiline placeholder="mensaje" onChange={this.handleChange('mensaje')}></TextField>
                            <Button onClick={() => this.sendMessage()} raised="true" type="button" className="btn btn-primary">Enviar</Button>
                        </div>

                    </div>
                </Dialog>
            </div>




        );
    }

}


export default ListMessages;