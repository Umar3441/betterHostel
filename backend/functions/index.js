const functions = require("firebase-functions");
const admin = require('firebase-admin')






var serviceAccount = require("./dogarhouse-b97a0-firebase-adminsdk-qzph2-80dc3864f2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



exports.helloWorld = functions.https.onRequest(async (request, response) => {

  const snapshot = await admin.firestore().collection('users').get()
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  let arr = []

  snapshot.forEach(doc => {
    arr.push(doc.data());
  });



  response.send(arr);
});


exports.myFunction = functions.firestore
  .document('posts/{docId}')
  .onWrite((change, context) => {

    const user = admin.firestore().collection('users').get()
      .then(
        (doc) => functions.logger.log("Change -- >", doc.docs())
      )

    // functions.logger.log("Change -- >", change);
    // functions.logger.log("Context -- >", context);




    // admin.firestore().collection('users').doc('63mseRQTj1gB3kSTsR4DjDe7BGl1').update(
    //   {
    //     displayName: change
    //   }
    // )

  });