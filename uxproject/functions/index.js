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
/*
    user.sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
      */
    return newUserRef.set({
        uid:uid, 
        photoUrl:photoUrl,
        displayName:displayName,
        email:email ,
        signIn:false
    })
})

exports.seenMessages = functions.database.ref("messages/{pushId}/{sentByID}").onUpdate(
  (change) => {
   // const boolNotSeen = change.after.ref.parent.child("notSeen");
  //const contNotRead = change.after.ref.child("notRead");

  const original = change.before.val();
  const updated = change.after.val();

  const messageIDRef = change.after.ref.parent;
  const countRef = messageIDRef.child('notRead');
  //console.log("contador value: " + countRef.val());

  console.log("notRead original value: " + original.notSeen);
  console.log("notRead updated value: " + updated.notSeen);


  let add = 0;
  if(original.notSeen === true && updated.notSeen === false ){
    add--;
  }else if(original.notSeen === false && updated.notSeen === true){
    add++;
  }else{
    return null;
  }

  return countRef.transaction((current) => {
    return (current || 0) + add;
  })


});

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


