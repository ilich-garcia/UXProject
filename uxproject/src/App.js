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
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">About</a>
            <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Tutorías</a>
            <a className="nav-item nav-link" id="nav-chat-tab" data-toggle="tab" href="#nav-chat" role="tab" aria-controls="nav-contact" aria-selected="false">Chat</a>
            <a className="nav-item nav-link" id="nav-quizzes-tab" data-toggle="tab" href="#nav-quizzes" role="tab" aria-controls="nav-contact" aria-selected="false">Quizzes</a>
            <a className="nav-item nav-link" id="nav-help-tab" data-toggle="tab" href="#nav-help" role="tab" aria-controls="nav-contact" aria-selected="false">Ayuda</a>

            {this.state.user ?
              <button className="btn btn-secondary logoutButton" onClick={this.handleLogOut}>Cerrar sesión</button>
              :
              <button className="btn btn-primary loginButton" type="button" onClick={this.handleAuth}>Iniciar sesión</button>
            }
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
          <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
          <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
        </div>
      </div>
    );
  }
}

export default App;
