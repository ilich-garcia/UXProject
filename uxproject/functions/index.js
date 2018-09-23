const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const ref  = admin.database().ref();

exports.createUserAccount = functions.auth.user().onCreate(event =>{
    const uid  = event.uid
    const email = event.email
    const photoUrl  = event.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrDXE-6l2Xxy0VUkdedM_1vz-Gx8J61cQ4XT0xPEzFd3JOGhQL"
    const displayName = event.displayName
    const newUserRef  = ref.child(`/users/${uid}`)
    return newUserRef.set({
        uid:uid, 
        photoUrl:photoUrl,
        displayName:displayName,
        email:email ,
        signIn:false
    })
})


