import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'firebase/auth';
import {firebase} from './firebase/firebase';



ReactDOM.render(<App />, document.getElementById('root'));

export{
    firebase,
};