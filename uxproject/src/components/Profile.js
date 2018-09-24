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


import { UserProfile } from "./UserProfile";

//import DeleteIcon from "@material-ui/icons/Delete";
//import FilterListIcon from "@material-ui/icons/FilterList";
//import { firebase } from "@firebase/app";

function generate(element) {
    return [0].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


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
        this.testEditClasses = this.testEditClasses.bind(this);
        this.editClasses = this.editClasses.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.guardarCambios = this.guardarCambios.bind(this);
        this.checkIfExists = this.checkIfExists.bind(this);
        this.addClass = this.addClass.bind(this);

    }

    /*addClass(newClass) {
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

    }*/

    addClass(newClass) {
        this.setState({ open: false });
        if (newClass !== "") {
            if (!this.state.myClasses.includes(newClass)) {
                var userId = fire.auth().currentUser.uid;
                var ref = fire.database().ref().child("usuarios/tutores/" + userId);

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
        firebase.auth().onAuthStateChanged(user => {
            var userId = fire.auth().currentUser.uid;
            var ref = fire.database().ref().child("usuarios/tutores/" + userId);

            ref.update({
                nombre: this.state.nombreEdit,
                email: this.state.email,
                carrera: this.state.carrera,
            });

        });


    }

    deleteClass(classToDelete) {
        let currentComponent = this;
        var userId = fire.auth().currentUser.uid;

        var ref = fire.database().ref().child("usuarios/tutores/" + userId);

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
        let currentComponent = this;




        firebase.auth().onAuthStateChanged(user => {
            // Cada vez que nos loggeemos o nos salgamos, el user tendrá información.
            if (user !== null) {
                //const name = auth.currentUser.displayName;
                var userId = auth.currentUser.uid;
                console.log("uid: " + userId);
                console.log("idk");

                const refUsuario = fire.database().ref().child("usuarios/tutores/" + userId);

                refUsuario.once("value").then(snapshot => {

                    const data = snapshot.val();
                    const nombre = data.nombre;
                    const email = data.email;
                    const carrera = data.carrera;

                    this.setState({
                        nombre: nombre,
                        emailStatic: email,
                        carreraStatic: carrera
                    })
                });

                this.setState({
                    dense: false,
                    secondary: false,
                });
                //console.log(name);


                var ref = fire.database().ref().child("usuarios/tutores/").child(userId).child("tutClases");
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
        /*
                return(
                    <UserProfile nombre = {this.state.nombre} tipoCuenta = 'tutor' carrera = {this.state.carrera} email = {this.state.email} clases = {this.state.myClasses}></UserProfile>
                );*/


        //en vez de esto pordia pasarlo el objeto del usuario de la base de datos


        //view del tutor
        /*if (this.state.tipoCuenta === 'tutor') {
            return ();
        } else {//es alumno
            return ();
        }*/

        const { classes } = this.props;
        const { dense, secondary } = this.state;
        //var names = ['Calculo', 'Trigonometria', 'IDK'];
        return (

            <div>
                <div className="jumbotron">
                    <h1>Hola {this.state.nombre}</h1>
                    <p>Aquí puedes editar tu perfil</p>
                </div>

                <div className="container">

                    <div className="col-xs-2">
                        <label htmlFor="ex1">Nombre</label>
                        <input onChange={this.handleChange('nombreEdit')} className="w-50 form-control" id="nombre" type="text" placeholder={this.state.nombre}/>
                    </div>

                    <div className="col-xs-2">
                        <label htmlFor="ex1">Carrera</label>
                        <input onChange={this.handleChange('carrera')} className="w-50 form-control" id="carrera" type="text" placeholder={this.state.carreraStatic}/>
                    </div>

                    <div className="">
                        <label htmlFor="ex1">Email</label>
                        <input onChange={this.handleChange('email')} className="w-50 form-control" id="email" type="text" placeholder={this.state.emailStatic}/>
                    </div>



                    <Grid container spacing={16}>

                        <Grid item xs={12} md={6}>
                            <Typography style={{ flex: 1 }}>
                                Tutorías disponibles
                                <Button onClick= {this.handleClickOpen} color="primary" aria-label="Add">
                                    <AddIcon />
                                </Button>
                            </Typography>


                            {//lista todas las clases que el usuario puede dar tutorias
                            }
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



                    <br /><button onClick={() => this.guardarCambios()} type="button" className="btn btn-primary">Guardar Cambios</button>
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
                            {//lista todas las clases que estan disponibles para dar tutorias
                            }
                            <Select
                                native
                                value={this.state.select}
                                onClick={this.handleChange('select')}
                                onChange={ this.handleChange('select')}
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
