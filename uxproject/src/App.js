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
import { Redirect } from "react-router";
import Register from "./components/Register"

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  button: {
    justifyContent: "center"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.processSignIn = this.processSignIn.bind(this);
    this.processAuth = this.processAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }
  state = {
    user: null,
    signIn: false
  };

  handleAuth() {
    this.processAuth();
  }

  processAuth() {
    //console.log("Entro al AUTH");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({
          user: firebase.auth().currentUser
        });
      })
      .catch(error => {
        alert(`Error ${error.code}: ${error.message}`);
      })
      .then(() => {
        this.processSignIn();
      });
  }

  processSignIn() {
    console.log(firebase.auth().currentUser.uid);
    const ref = firebase.database().ref(`users/${this.state.user.uid}`);
    ref.on("value", snapshot => {
      console.log(snapshot.val().signIn);
    });
  }

  handleLogOut() {
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

        //Se movio a Cloud functions
        /*   firebase
          .database()
          .ref("users/" + user.uid)
          .set({ displayName: user.displayName, photoURL: user.photoURL });
     */
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div >
          <AppBar position="fixed"  >
            <Toolbar>
              <Typography variant="title" color="inherit" style={styles.flex}>
                Grappther
              </Typography>

              <div>
                {this.state.user ? (
                  <Link to="/perfil" style ={{flexGrow:1}}>
                    <IconButton aria-haspopup="true" color="inherit">
                      <Avatar
                        src={this.state.user ? this.state.user.photoURL : ""}
                      />
                    </IconButton>
                  </Link>
                ) : (
                  <div />
                )}
                <Link to="/" style={{ color: "#fff", textDecoration: "none", flexGrow:1 }}>
                  <Button aria-haspopup="true" color="inherit">
                    HOME
                  </Button>
                </Link>
                <Link
                  to="/crearTutoria"
                  style={{ color: "#fff", textDecoration: "none"  , flexGrow:1}}
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
                  <span>
                    <Link
                      to="/login"
                      style={{ color: "#fff", textDecoration: "none"  ,flexGrow:1}}
                    >
                      <Button
                        onClick={this.handleAuth}
                        aria-haspopup="true"
                        color="inherit"
                      >
                        inicio de sesión
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      style={{ color: "#fff", textDecoration: "none"  ,flexGrow:1}}
                    >
                      <Button
                        //onClick={this.handleAuth}
                        aria-haspopup="true"
                        color="inherit"
                      >
                        Registrarse
                      </Button>
                    </Link>
                  </span>
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
            <Route
              path="/login"
              render={() =>
                !this.state.signIn ? (
                  <Redirect to="/inicioSesion" />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/inicioSesion"
              render={() => (
                <div style={styles.button}>
                </div>
              )}
            />
            <Route
              path="/register"
              render={() => (
                  <Register />
              )}
            />
          </Switch>
        </div>  
      </BrowserRouter>
    );
  }
}

export default App;
