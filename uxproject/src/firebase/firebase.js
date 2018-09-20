import firebase from 'firebase';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBpsl8EwJTr911NbdECTtuSpbTJGVqUmYE",
    authDomain: "tutorials-app-34a98.firebaseapp.com",
    databaseURL: "https://tutorials-app-34a98.firebaseio.com",
    projectId: "tutorials-app-34a98",
    storageBucket: "tutorials-app-34a98.appspot.com",
    messagingSenderId: "816057718802"
};
/*
firebase.initializeApp({
    apiKey: "AIzaSyBpsl8EwJTr911NbdECTtuSpbTJGVqUmYE",
    authDomain: "tutorials-app-34a98.firebaseapp.com",
    databaseURL: "https://tutorials-app-34a98.firebaseio.com",
    projectId: "tutorials-app-34a98",
    storageBucket: "tutorials-app-34a98.appspot.com",
    messagingSenderId: "816057718802"
});*/



var fire = firebase.initializeApp(config);

const auth = firebase.auth();

export {
    auth,
};
export default fire;