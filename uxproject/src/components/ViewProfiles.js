import React, { Component } from "react";
import "../bootstrap.min.css";
import PropTypes from 'prop-types';
import { auth } from '../firebase/firebase';
import firebase from "firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
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


//import DeleteIcon from "@material-ui/icons/Delete";
//import FilterListIcon from "@material-ui/icons/FilterList";
//import { firebase } from "@firebase/app";


class ProfileTutor extends Component {
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
            myClasses: [],

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
        this.testFilter = this.testFilter.bind(this);
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
        //cargar los usuarios que son tutores
        let currentComponent = this;




        firebase.auth().onAuthStateChanged(user => {
            // Cada vez que nos loggeemos o nos salgamos, el user tendrá información.
            if (user !== null) {
                const name = auth.currentUser.displayName;
                var userId = auth.currentUser.uid;
                console.log("uid: " + userId);
                console.log("idk");

                this.setState({
                    nombre: name,
                    dense: false,
                    secondary: false,
                });
                console.log(name);


                var ref = fire.database().ref().child("users").child(userId).child("tutClases");
                var refAllClasses = fire.database().ref().child("clases");

                refAllClasses.on("value", function (snapshot) {
                    let list = []
                    snapshot.forEach(function (childSnapshot) {
                        var key = childSnapshot.key;
                        console.log(key);
                        console.log(childSnapshot.val());
                        list.push(childSnapshot.val());

                        currentComponent.setState({
                            clases: list
                        })
                    })
                });

                ref.on("value", function (snapshot) {
                    let list = []
                    snapshot.forEach(function (childSnapshot) {
                        var key = childSnapshot.key;
                        console.log(key);
                        console.log(childSnapshot.val());
                        list.push(key);

                        currentComponent.setState({
                            myClasses: list
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


        const { classes } = this.props;
        const { dense, secondary } = this.state;
        //var names = ['Calculo', 'Trigonometria', 'IDK'];
        return (

            <div>
                <div className="jumbotron">
                    <h1>Tutores</h1>
                    <p>Esta es una lista de los tutores disponibles</p>
                </div>

                <div className="container">

                    <Grid container spacing={16}>

                        <Grid item xs={12} md={6}>
                            <Typography style={{ flex: 1 }}>
                                Tutorías disponibles
                                <Button onClick={this.handleClickOpen} color="primary" aria-label="Add">
                                    <AddIcon />
                                </Button>
                            </Typography>


                            <List>


                                {this.state.myClasses.map((e) => {
                                    return <ListItem primarytext={e} key={e}>
                                        <ListItemText
                                            primary={e}
                                        />
                                        <ListItemSecondaryAction onClick={() => this.deleteClass(e)} >
                                            <IconButton aria-label="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>;
                                })}



                            </List>

                        </Grid>

                    </Grid>



                    <br /><button onClick={() => this.testFilter()} type="button" className="btn btn-primary">Guardar Cambios</button>
                    <br />
                </div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Agregar Clase</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            <Select
                                native
                                value={this.state.select}
                                onClick={this.handleChange('select')}
                                onChange={this.handleChange('select')}
                                placeholder="asd"
                            >

                                {this.state.clases.map((e) => {
                                    return <option key={e.idClase}>{e.nombre}</option>;
                                })}

                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={() => this.addClass(this.state.select)} color="primary">
                            Agregar clase
            </Button>
                    </DialogActions>
                </Dialog>


            </div>
        );

    }

}

/* para el select de agregar clase
<FormControl>
                        <Select
                            native
                            value={this.state.select}
                            onChange={this.handleChange('select')}
                            placeholder="asd"
                        >

                            {this.state.clases.map((e) => {
                                return <option key={e.idCLase}>{e.nombre}</option>;
                            })}

                        </Select>
                    </FormControl>

                    */
/*
ProfileTutor.propTypes = {
    classes: PropTypes.object.isRequired,
};*/

/*
                    <div className="form-group">
                        <label htmlFor="sel1">Clases disponibles para tutorías:</label>
                        <select className=" w-50 form-control" id="sel1">
                            <option>Intro. al Alg.</option>
                            <option>Algebra</option>
                            <option>Geom. y Trig.</option>
                            <option>Cálculo I</option>
                            <option>Cálculo II</option>
                        </select>

                    </div>*/

export default ProfileTutor;

/*
                    <div class="input-group">
                        <input type="text" class="form-control" />
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button">Go!</button>
                        </span>
                    </div>

                    */


                    /*

                    <ul>
                                {names.map(function (name, index) {
                                    return <li key={index}>{name}</li>;
                                })}
                            </ul>*/


                            /*

                            <CardActions style={{ justifyContent: 'center' }}>
                        <div variant="outlined" color="primary" onClick={this.addClasses}>
                            <SimpleSnackBar>

                            </SimpleSnackBar>
                        </div>


                    </CardActions>

                    */

                    /*
                     <Button variant="fab" onClick={this.handleClickOpen} color="primary" aria-label="Add">
                                    <AddIcon />
                                </Button>*/
