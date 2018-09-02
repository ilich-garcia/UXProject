import React, { Component } from "react";
import { BrowserRouter , Switch , Route , Redirect } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact />
          <Route path="/createClass" exact />
          <Route path="/" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
