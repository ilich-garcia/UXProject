const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const ref  = admin.database().ref();

exports.createUserAccount = functions.auth.user().onCreate(event =>{
    const uid  = event.uid
    const email = event.email
    const photoUrl  = event.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrDXE-6l2Xxy0VUkdedM_1vz-Gx8J61cQ4XT0xPEzFd3JOGhQL"
    const displayName = event.displayName
    const newUserRef  = ref.child(`/users/${uid}`)
/*
    user.sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
      */
    return newUserRef.set({
        photoUrl:photoUrl,
        displayName:displayName,
        email:email
    })
})

/*
exports.updateAccount = functions.auth.user().onCreate(event => {
    const user = event.data; // The firebase user
    //const id = user.uid;
    const displayName = user.displayName;
    const email = user.email;

    user.updateProfile({
        displayName: displayName,
        clases : ,
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });

    user.updateEmail("user@example.com").then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
    return admin.database().ref("/users/"+id+"/info/status").set("ok"); 
});
*/


