import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';

firebase.initializeApp({
    apiKey: "AIzaSyBpsl8EwJTr911NbdECTtuSpbTJGVqUmYE",
    authDomain: "tutorials-app-34a98.firebaseapp.com",
    databaseURL: "https://tutorials-app-34a98.firebaseio.com",
    projectId: "tutorials-app-34a98",
    storageBucket: "tutorials-app-34a98.appspot.com",
    messagingSenderId: "816057718802"
});

ReactDOM.render(<App />, document.getElementById('root'));