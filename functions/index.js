const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.LoginFunction = functions.https.onRequest((data, context) => {
   functions.logger.info("Hello logs!" + data.text, {structuredData: true});
   context.send("Hello from Firebase!");
});
