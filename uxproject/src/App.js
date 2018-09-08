import React, { Component } from "react";
import firebase from 'firebase';
//import { BrowserRouter , Switch , Route } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";

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
    firebase.auth().onAuthStateChanged(user => { // Cada vez que nos loggeemos o nos salgamos, el user tendrá información.
      if (user !== null) {
        this.setState({ user });
        firebase.database().ref('users/' + user.uid).set({ displayName: user.displayName, photoURL: user.photoURL });
      }
    });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        alert(`${result.user.email} ha iniciado sesión`)
        this.setState(() => ({
          alert: <div className="alert alert-success alert-dismissible fade show">
            <button onClick={this.handleAlert} type="button" className="close" data-dismiss="alert">&times;</button>
          </div>
        }))
      })
      .catch(error => {
        alert(`Error ${error.code}: ${error.message}`)
        this.setState(() => ({
          alert: <div className="alert alert-danger alert-dismissible fade show">
            <button onClick={this.handleAlert} type="button" className="close" data-dismiss="alert">&times;</button>
          </div>
        }))
      });
  }

  handleAlert() {
    this.setState(() => ({
      alert: null
    }))
  }
  
  handleLogOut() {
    this.setState({
      alert: <div className="alert alert-success alert-dismissible fade show">
        <button onClick={this.handleAlert} type="button" className="close" data-dismiss="alert">&times;</button>
      </div>
    })
    
    alert("¡Has cerrado sesión exitosamente!");
    firebase.auth().signOut();
  }

/*  renderLogginButton() {
    if (this.state.user) { // Si el usuario está loggeado.
      return (
        <div>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName} />

          {
            this.state.pictures.map(picture => (
              <div key="-2" className="App-card">
                <figure className="App=card-image">
                  <img width="320" src={picture.image} alt="" />
                  <figcaption className="App-card-footer">
                    <img className="App-card-avatar" src={picture.photoURL} alt={picture.displayName} />
                    <span className="App-card-name">{picture.displayName}</span>
                  </figcaption>
                </figure>
              </div>
            )).reverse()
          }

        </div>
      );
    } else { // Si no lo está.
      return (
        <button onClick={this.handleAuth}>Login</button>
      );
    }
  }*/

  render() {
    return (
      /*<BrowserRouter>
        <Switch>
          <Route path="/" exact />
          <Route path="/createClass" exact />
          <Route path="/" exact />
        </Switch>
      </BrowserRouter>*/
      <div>
      </div>
    );
  }
}

export default App;
