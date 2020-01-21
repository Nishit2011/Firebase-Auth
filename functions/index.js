const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

//function to be called from frontend
exports.addAdminRole = functions.https.onCall((data, context) => {
  //checking that Only admins are authorised to make other users as admin
  //or checking if the user invoking this function is an admin

  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins" };
  }

  //get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin`
      };
    })
    .catch(err => {
      return err;
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
