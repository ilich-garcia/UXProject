import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import firebase from "firebase";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  }
};

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        alert(`${result.user.email} ha iniciado sesión`);
        this.setState({
          user: firebase.auth().currentUser
        });
      })
      .catch(error => {
        alert(`Error ${error.code}: ${error.message}`);
      });
  }

  handleAlert() {
    this.setState(() => ({
      alert: null
    }));
  }

  handleLogOut() {
    this.setState({
      alert: (
        <div className="alert alert-success alert-dismissible fade show">
          <button
            onClick={this.handleAlert}
            type="button"
            className="close"
            data-dismiss="alert"
          >
            &times;
          </button>
        </div>
      )
    });

    alert("¡Has cerrado sesión exitosamente!");
    firebase.auth().signOut();
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Grappther
          </Typography>

          <div>
            <Link to="/perfil">
              <IconButton aria-haspopup="true" color="inherit">
                <Avatar >R</Avatar>
              </IconButton>
            </Link>
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              <Button aria-haspopup="true" color="inherit">
                HOME
              </Button>
            </Link>
            <Link
              to="/crearTutoria"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <Button aria-haspopup="true" color="inherit">
                CREAR TUTORIA
              </Button>
            </Link>
            <Button
              onClick={this.handleAuth}
              aria-haspopup="true"
              color="inherit"
            >
              LOGIN
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
