import React, { Component } from "react";
import firebase from "firebase";
import "../bootstrap.min.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Portrait";
import { Link } from "react-router-dom";

export default class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;

        this.state = {
            userID : "",
            nombre : "",
            email: "",
            clases : [],
            user: null,
        }
        this.nameMethod = this.nameMethod.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            // Cada vez que nos loggeemos o nos salgamos, el user tendrá información.
            if (user !== null) {
              this.setState({ user });

              const ref = firebase.database().ref().child("users").child(this.props.objectUser.uid).child("tutClases");

                ref.on("value", snapshot => {
                    let list = []
                    snapshot.forEach(childSnapshot => {
                        var key = childSnapshot.key;
                        console.log(key);
                        console.log(childSnapshot.val());
                        list.push(key);

                        this.setState({
                            clases: list
                        })
                    })
                });

                this.setState({
                    userID : this.props.objectUser.uid,
                    nombre: this.props.objectUser.nombre,
                    email: this.props.objectUser.email

                })


              

            } else {
              this.setState(
                { user: null }
              )
              console.log("not authed");
            }
          });
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            // Cada vez que nos loggeemos o nos salgamos, el user tendrá información.
            if (user !== null) {
              this.setState({ user });

              const ref = firebase.database().ref().child("users").child(this.props.objectUser.uid).child("tutClases");

                ref.on("value", snapshot => {
                    let list = []
                    snapshot.forEach(childSnapshot => {
                        var key = childSnapshot.key;
                        console.log(key);
                        console.log(childSnapshot.val());
                        list.push(key);

                        this.setState({
                            clases: list
                        })
                    })
                }).bind(this);

            } else {
              this.setState(
                { user: null }
              )
              console.log("not authed");
            }
          });
    }

    nameMethod() {

    }

    sendMessage(){

    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Tutor: {this.props.objectUser.nombre}</h1>
                    <p>Aquí puedes ver la información del tutor.</p>

                    <Link
                        to="/enviarMensaje"
                        style={{ color: "#fff", textDecoration: "none" }}
                    >
                        <Button onClick={() => this.sendMessage()} raised="true" type="button" className="btn btn-primary">Enviar mensaje </Button>
                    </Link>

                </div>

                <div className="container">

                    <div className="col-xs-2">
                        <label htmlFor="ex1">Nombre</label>
                        <input readOnly className="mt-2 col-md-12  form-control-static" id="nombre" type="text" placeholder={this.props.objectUser.nombre} />
                    </div>

                    <div className="col-xs-2">
                        <label htmlFor="ex1">Carrera</label>
                        <input readOnly className="mt-2 col-md-12  form-control-static" id="carrera" type="text" placeholder={this.props.objectUser.carrera} />

                    </div>

                    <div className="">
                        <label htmlFor="ex1">Email</label>
                        <input readOnly className="mt-2 col-md-12  form-control-static" id="email" type="text" placeholder={this.props.objectUser.email} />
                    </div>



                    <Grid container spacing={16}>

                        <Grid item xs={12} md={6}>
                            <Typography style={{ flex: 1 }}>
                                Tutorías disponibles
                        </Typography>


                            <List>


                                {this.state.clases.map((e) => {
                                    return <ListItem primarytext={e} key={e}>
                                        <ListItemSecondaryAction >
                                        </ListItemSecondaryAction>
                                        <ListItemText
                                            primary={e}
                                        />

                                    </ListItem>;
                                })}


                            </List>

                        </Grid>

                    </Grid>

                    <br />
                    {/*
                <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">


</Dialog>*/}
                </div>

            </div>
        )
    }



}

