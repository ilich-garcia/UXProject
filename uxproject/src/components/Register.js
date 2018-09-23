import React, { Component } from "react";
import { Button, Avatar, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/";
import firebase from 'firebase'
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginTop: -150,
    marginLeft: -150
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});
/*
Tutor datos necesarios
-Edad
-Titulo
-Universidad
-Conocimientos
-Areas para dar tutorias
-precio por hora
-Disponibilidad de horarios
*/
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeAccount: "",
      edad: 0,
      titulo: "",
      universidad: "",
      inputConocimiento: "",
      conocimientos: [],
      area: "",
      precio: 0,
      disponibilidad: []
    };
    this.handlerTutorButton = this.handlerTutorButton.bind(this);
    this.handlerAlumnoButton = this.handlerAlumnoButton.bind(this);
    this.renderFormTutor = this.renderFormTutor.bind(this);
    this.renderFormAlumno = this.renderFormAlumno.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handlerTutorButton() {
    this.setState({
      typeAccount: "tutor"
    });
  }

  handlerAlumnoButton() {
    this.setState({
      typeAccount: "alumno"
    });
  }
/*
  handleChangeEdad() {
    this.setState({
      edad: this.state.edad
    });
  }
  handleChangeTitulo() {
    this.setState({
      titulo: this.state.titulo
    });
  }
  handleChangeUniversidad() {
    this.setState({
      universidad: this.state.universidad
    });
  }
  handleChangeConocimiento() {
    this.setState({
      inputConocimiento: this.state.inputConocimiento
    });
  }
  handleChangeArea() {
    this.setState({
      area: this.state.area
    });
  }

  handleChangePrecio() {
    this.setState({
      precio: this.state.precio
    });
  }
  handleChangeDisponibilidad() {
    this.setState({
      disponibilidad: this.state.disponibilidad
    });
  }
*/
  handleSignIn() {
    //console.log("Entro al AUTH");
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(error => {
        alert(`Error ${error.code}: ${error.message}`);
      })
      .then(() => {
        this.processSignIn();
      });
  }

  processSignIn() {
    console.log(firebase.auth().currentUser.uid);
    const ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
    ref.set({
      edad: this.state.edad,
      titulo:this.state.titulo,
      universidad: this.state.universidad,
      conocimientos: [],
      area: this.state.area,
      precio: this.state.precio,
      disponibilidad: []
    });
  }
  renderFormTutor() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="universidad"
          label="Universidad"
          className={classes.textField}
          value={this.state.universidad}
          //onChange={this.handleChangeUniversidad()}
          margin="normal"
        />
        <TextField
          id="edad"
          label="Edad"
          className={classes.textField}
          value={this.state.name}
          //onChange={this.handleChangeEdad()}
          margin="normal"
        />

        <TextField
          id="conocimiento"
          label="Conocimiento"
          className={classes.textField}
          value={this.state.name}
          //onChange={this.handleChangeConocimiento()}
          margin="normal"
        />
        <TextField
          id="areas"
          label="Areas para hacer tutorias"
          className={classes.textField}
          value={this.state.name}
          //onChange={this.handleChangeArea()}
          margin="normal"
        />

        <TextField
          id="precio"
          label="Precio por hora"
          className={classes.textField}
          value={this.state.name}
          //onChange={this.handleChangePrecio()}
          margin="normal"
        />
        <TextField
          id="horario"
          label="Horas de disponibilidad"
          className={classes.textField}
          value={this.state.name}
          //onChange={this.handleChangeDisponibilidad()}
          margin="normal"
        />
        <Button
          onClick={this.handleSignIn()}
          aria-haspopup="true"
          color="inherit"
        >
          Registrarse
        </Button>
      </form>
    );
  }

  renderFormAlumno() {
    return <div />;
  }

  render() {
    if (this.state.typeAccount == "tutor") {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            marginTop: 200
          }}
        >
          {this.renderFormTutor()}
        </div>
      );
    } else if (this.state.typeAccount == "alumno") {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            marginTop: 200
          }}
        >
          Eligio Alumno
        </div>
      );
    }
    return this.renderInit();
  }

  renderInit() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          marginTop: 200
        }}
      >
        <Button
          aria-haspopup="true"
          color="primary"
          onClick={this.handlerTutorButton}
        >
          Tutor
        </Button>
        <Button
          aria-haspopup="true"
          color="primary"
          onClick={this.handlerAlumnoButton}
        >
          Alumno
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Register);
