import React, { Component } from "react";
import firebase from "firebase";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }
  state = {
    user: null
  };

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

  handleLogOut() {
    alert("¡Has cerrado sesión exitosamente!");
    firebase.auth().signOut();
    this.setState(state => ({
      user: null
    }));
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      // Cada vez que nos loggeemos o nos salgamos, el user tendrá información.
      if (user !== null) {
        this.setState({ user });
        firebase
          .database()
          .ref("users/" + user.uid)
          .set({ displayName: user.displayName, photoURL: user.photoURL });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" style={styles.flex}>
                Grappther
              </Typography>

              <div>
                <Link to="/perfil">
                  <IconButton aria-haspopup="true" color="inherit">
                    <Avatar
                      src={this.state.user ? this.state.user.photoURL : ""}
                    />
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
                {this.state.user ? (
                  <Button
                    onClick={this.handleLogOut}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    LOGOUT
                  </Button>
                ) : (
                  <Button
                    onClick={this.handleAuth}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    LOGIN
                  </Button>
                )}
              </div>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/">
              {<div>HOME</div>}
            </Route>
            <Route path="/crearTutoria">{<div>Crear Tutoria</div>}</Route>
            <Route path="/perfil">{<div>PERFIL</div>}</Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
