import React, { Component } from "react";
import firebase from "firebase";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MenuAppBar from "./components/MenuAppBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      users: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
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

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        alert(`${result.user.email} ha iniciado sesión`);
        this.setState(() => ({
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
        }));
      })
      .catch(error => {
        alert(`Error ${error.code}: ${error.message}`);
        this.setState(() => ({
          alert: (
            <div className="alert alert-danger alert-dismissible fade show">
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
        }));
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
    return (
      <BrowserRouter>
        <div>
          <MenuAppBar />
          <Switch>
            <Route path="/" exact />
            <Route path="/createClass" exact />
            <Route path="/" exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
