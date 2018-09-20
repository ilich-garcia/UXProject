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
            nombre: "",
            carrera: "",
            email: "",
            clases: [],
            select: '',

        };
        //this.addClasses = this.addClasses.bind(this);
        this.renderList = this.renderList.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    /*
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
                const name = auth.currentUser.displayName;

                this.setState({
                    nombre: name,
                    dense: false,
                    secondary: false,
                });
                console.log(name);


                var ref = fire.database().ref().child("clases");

                ref.on("value", function (snapshot) {
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
        let data = this.state.clases.map((doc, i) => {

            <ListItem primaryText={doc.nombre} key={doc.id}>
            </ListItem>

        })


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
                        <input className="w-50 form-control" id="nombre" type="text" placeholder={this.state.nombre} />
                    </div>

                    <div className="col-xs-2">
                        <label htmlFor="ex1">Carrera</label>
                        <input className="w-50 form-control" id="carrera" type="text" placeholder={this.state.carrera} />
                    </div>

                    <div className="">
                        <label htmlFor="ex1">Email</label>
                        <input className="w-50 form-control" id="email" type="text" placeholder={this.state.email} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sel1">Clases disponibles para tutorías:</label>
                        <select className=" w-50 form-control" id="sel1">
                            <option>Intro. al Alg.</option>
                            <option>Algebra</option>
                            <option>Geom. y Trig.</option>
                            <option>Cálculo I</option>
                            <option>Cálculo II</option>
                        </select>

                    </div>






                    <Grid container spacing={16}>

                        <Grid item xs={12} md={6}>
                            <Typography >
                                Tutorías disponibles
                                <Button color="primary" aria-label="Add">
                                    <AddIcon />
                                </Button>
                            </Typography>

                            <List>

                             
                                {this.state.clases.map((e) => {
                                return <ListItem primarytext={e.nombre} key={e.idClase}>
                                </ListItem>;
                            })}

                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>

                            </List>

                        </Grid>

                    </Grid>

                    <FormControl>
                        <Select
                            native
                            value={this.state.select}
                            onChange={this.handleChange('select')}
                            placeholder = "asd"
                        >

                            {this.state.clases.map((e) => {
                                return <option key={e.idCLase}>{e.nombre}</option>;
                            })}

                        </Select>
                    </FormControl>

                    <br /><button type="button" className="btn btn-primary">Guardar Cambios</button>
                </div>

            </div>
        );

    }

}
/*
ProfileTutor.propTypes = {
    classes: PropTypes.object.isRequired,
};*/

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