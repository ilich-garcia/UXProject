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
            mensajes: []

        };
        //this.addClasses = this.addClasses.bind(this);
        this.renderList = this.renderList.bind(this);
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


    handleClickOpen = () => {
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
                });

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

                //recorrer todos los usuarios y verificar si tipo cuenta === tutor
                var refTutores1 = fire.database().ref().child("messages");
                //o ya tener en la base de datos los tutores de esta forma
                //var refTutores = fire.database().ref().child("usuarios/tutores");

                refTutores1.on("value", snapshot => {
                    let list = [];
                    snapshot.forEach(childSnapshot => {
                        //var key = childSnapshot.key;
                        //console.log(key);
                        //console.log(childSnapshot.val());
                        list.push(childSnapshot.val());
                        console.log(childSnapshot.val());

                        this.setState({
                            messages: list
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



    renderList() {
        return this.state.clases.map(el => {
            return <ListItem primarytext={el.nombre} key={el.idClase} />
        })
    }



    //obtener los datos del usuario logged in en el componentWillMount y cambiar el state
    render() {

        let data = this.state.mensajes.map((doc, i) => {
            return (

                <div key={i}>
                    <ListItem primarytext={doc.nombre} key={i}>
                        <ListItemText
                            primary={doc.nombre}
                        />
                        <ListItemText
                            primary={doc.mensaje}
                        />
                        <ListItemSecondaryAction onClick={() => this.openProfile(doc)} >
                            <Button aria-label="verPerfil">
                                Ver Perfil <ProfileIcon />
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    
                </div>




            )
        });

        return (
            <div>
                <Grid container spacing={16}>

                    <Grid item xs={12} md={6}>
                        <Typography style={{ flex: 1 }}>
                            Tutores
                        </Typography>


                        <List>
                            {data}
                        </List>

                    </Grid>

                </Grid>

                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title" >


                    <div>
                        <div className="jumbotron">
                            <h1>Enviar mensaje</h1>
                            <p>Tutor: {this.props.objectUser.nombre}</p>

                            {/*<Link
                        to="/enviarMensaje"
                        style={{ color: "#fff", textDecoration: "none" }}
                    >
                        <Button onClick={() => this.sendMessage()} raised="true" type="button" className="btn btn-primary">Enviar mensaje </Button>
                    </Link>*/}


                        </div>
                        <div>

                            <Button onClick={() => this.sendMessage()} raised="true" type="button" className="btn btn-primary">Enviar</Button>
                        </div>

                    </div>
                </Dialog>



            </div>
        );
    }

}


export default ListMessages;