import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//import * as auth from './auth/auth';
import 'firebase/auth';
import {firebase} from './firebase/firebase';
//import * as firebase from './firebase/firebase';



ReactDOM.render(<App />, document.getElementById('root'));

export{
    firebase,
};