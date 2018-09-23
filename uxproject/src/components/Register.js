import React, { Component } from "react";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
  GridList,
  GridListTile,
  Chip
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
    width: 300
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  chip: {
    margin: theme.spacing.unit,
    flexGrow: 1
  },
  gridList: {
    flexGrow: 1
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
      universidad: "",
      inputConocimiento: "",
      conocimientos: [],
      inputArea: "",
      areas: [],
      precio: 0,
      lun: false,
      mar: false,
      mier: false,
      jue: false,
      vie: false,
      sab: false,
      dom: false
    };
    this.handlerTutorButton = this.handlerTutorButton.bind(this);
    this.handlerAlumnoButton = this.handlerAlumnoButton.bind(this);
    this.renderFormTutor = this.renderFormTutor.bind(this);
    this.renderFormAlumno = this.renderFormAlumno.bind(this);
    this.handleSignInTutor = this.handleSignInTutor.bind(this);
    this.handleSignInAlumno = this.handleSignInAlumno.bind(this);
  }

  handleKeyPress = event => {
    let temp = this.state.conocimientos;
    if (event.key == "Enter") {
      console.log(this.state.inputConocimiento);

      temp.push(this.state.inputConocimiento);
      this.setState(state => ({
        conocimientos: temp,
        inputConocimiento: ""
      }));
      console.log(this.state.conocimientos);
    }
  };
  handleKeyAreaPress = event => {
    let temp = this.state.areas;
    if (event.key == "Enter") {
      console.log(this.state.inputArea);

      temp.push(this.state.inputArea);
      this.setState(state => ({
        areas: temp,
        inputArea: ""
      }));
      console.log(this.state.areas);
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

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
  handleSignInAlumno() {
    console.log("Entro al AUTH");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(error => {
        alert(`Error ${error.code}: ${error.message}`);
      })
      .then(() => {
        this.processSignInAlumno();
      })
      .then(this.props.history.push("/"));
  }
  handleSignInTutor() {
    console.log("Entro al AUTH");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(error => {
        alert(`Error ${error.code}: ${error.message}`);
      })
      .then(() => {
        this.processSignInTutor();
      })
      .then(this.props.history.push("/"));
  }
  processSignInAlumno() {
    console.log(firebase.auth().currentUser.uid);
    const ref = firebase.database().ref(`usuarios/alumnos/${firebase.auth().currentUser.uid}`);
    ref.set({
      edad: this.state.edad,
      universidad: this.state.universidad,
      conocimientos: this.state.conocimientos,
      lun: this.state.lun,
      mar: this.state.mar,
      mier: this.state.mier,
      jue: this.state.jue,
      vie: this.state.vie,
      sab: this.state.sab,
      dom: this.state.dom
    });
  }
  processSignInTutor() {
    console.log(firebase.auth().currentUser.uid);
    const ref = firebase.database().ref(`usuarios/tutores/${firebase.auth().currentUser.uid}`);
    ref.set({
      edad: this.state.edad,
      universidad: this.state.universidad,
      conocimientos: this.state.conocimientos,
      areas: this.state.areas,
      precio: this.state.precio,
      lun: this.state.lun,
      mar: this.state.mar,
      mier: this.state.mier,
      jue: this.state.jue,
      vie: this.state.vie,
      sab: this.state.sab,
      dom: this.state.dom
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
          onChange={(e, newValue) =>
            this.setState({ universidad: e.target.value })
          }
          margin="normal"
        />
        <TextField
          id="edad"
          label="Edad"
          className={classes.textField}
          value={this.state.edad}
          onChange={(e, newValue) => this.setState({ edad: e.target.value })}
          margin="normal"
        />

        <TextField
          id="conocimiento"
          label="Conocimientos"
          className={classes.textField}
          value={this.state.inputConocimiento}
          onChange={(e, newValue) =>
            this.setState({ inputConocimiento: e.target.value })
          }
          onKeyPress={this.handleKeyPress}
          margin="normal"
        />
        <GridList
          cellHeight={"auto"}
          spacing={3}
          className={classes.gridList}
          cols={3}
        >
          {this.state.conocimientos.map(tile => (
            <GridListTile key={tile} cols={1}>
              <Chip label={tile} className={classes.chip} />
            </GridListTile>
          ))}
        </GridList>
        <TextField
          id="areas"
          label="Areas para hacer tutorias"
          className={classes.textField}
          value={this.state.inputArea}
          onChange={(e, newValue) =>
            this.setState({ inputArea: e.target.value })
          }
          onKeyPress={this.handleKeyAreaPress}
          margin="normal"
        />
        <GridList
          cellHeight={"auto"}
          spacing={3}
          className={classes.gridList}
          cols={3}
        >
          {this.state.areas.map(tile => (
            <GridListTile key={tile} cols={1}>
              <Chip label={tile} className={classes.chip} />
            </GridListTile>
          ))}
        </GridList>

        <TextField
          id="precio"
          label="Precio por hora"
          className={classes.textField}
          value={this.state.precio}
          onChange={(e, newValue) => this.setState({ precio: e.target.value })}
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={(e, newValue) => this.setState({ email: e.target.value })}
          margin="normal"
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.lun}
                onChange={this.handleChange("lun")}
                value="lun"
              />
            }
            label="Lun"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.mar}
                onChange={this.handleChange("mar")}
                value="mar"
              />
            }
            label="Mar"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.mie}
                onChange={this.handleChange("mier")}
                value="mier"
              />
            }
            label="Mie"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.jue}
                onChange={this.handleChange("jue")}
                value="jue"
              />
            }
            label="Jue"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.vie}
                onChange={this.handleChange("vie")}
                value="vie"
              />
            }
            label="Vie"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.sab}
                onChange={this.handleChange("sab")}
                value="sab"
              />
            }
            label="Sab"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.dom}
                onChange={this.handleChange("dom")}
                value="dom"
              />
            }
            label="Dom"
          />
        </FormGroup>
        <Button onClick={this.handleSignInTutor}>Registrarse</Button>
      </form>
    );
  }

  renderFormAlumno() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="universidad"
          label="Universidad"
          className={classes.textField}
          value={this.state.universidad}
          onChange={(e, newValue) =>
            this.setState({ universidad: e.target.value })
          }
          margin="normal"
        />

        <TextField
          id="edad"
          label="Edad"
          className={classes.textField}
          value={this.state.edad}
          onChange={(e, newValue) => this.setState({ edad: e.target.value })}
          margin="normal"
        />
        <TextField
          id="conocimiento"
          label="Conocimientos"
          className={classes.textField}
          value={this.state.inputConocimiento}
          onChange={(e, newValue) =>
            this.setState({ inputConocimiento: e.target.value })
          }
          onKeyPress={this.handleKeyPress}
          margin="normal"
        />
        <GridList
          cellHeight={"auto"}
          spacing={3}
          className={classes.gridList}
          cols={3}
        >
          {this.state.conocimientos.map(tile => (
            <GridListTile key={tile} cols={1}>
              <Chip label={tile} className={classes.chip} />
            </GridListTile>
          ))}
        </GridList>

        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={(e, newValue) => this.setState({ email: e.target.value })}
          margin="normal"
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.lun}
                onChange={this.handleChange("lun")}
                value="lun"
              />
            }
            label="Lun"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.mar}
                onChange={this.handleChange("mar")}
                value="mar"
              />
            }
            label="Mar"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.mie}
                onChange={this.handleChange("mier")}
                value="mier"
              />
            }
            label="Mie"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.jue}
                onChange={this.handleChange("jue")}
                value="jue"
              />
            }
            label="Jue"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.vie}
                onChange={this.handleChange("vie")}
                value="vie"
              />
            }
            label="Vie"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.sab}
                onChange={this.handleChange("sab")}
                value="sab"
              />
            }
            label="Sab"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.dom}
                onChange={this.handleChange("dom")}
                value="dom"
              />
            }
            label="Dom"
          />
        </FormGroup>
        <Button onClick={this.handleSignInAlumno}>Registrarse</Button>
      </form>
    );
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
          {this.renderFormAlumno()}
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

export default withRouter(withStyles(styles)(Register));
