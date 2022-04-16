const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require("express");
const bodyParser = require("body-parser");

import { collection, addDoc, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where} from "firebase/firestore";

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.writeUserData = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.body;

  var creationTime = original.creationTime;
  var name = original.name;
  var email = original.email;
  var id = original.id;
  // Push the new message into Firestore using the Firebase Admin SDK.
  var jsonPayLoad = {bio: "", created_time: creationTime, display_name: name, email: email, phone_number: "", photo_url: "", uid: id};
  const writeResult = await admin.firestore().collection('users').add(id, JSON.stringify(jsonPayLoad));
  // Send back a message that we've successfully written the message
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
    // res.json({took: ` ${JSON.stringify(jsonPayLoad)}`});
    res.json(jsonPayLoad);
});


// export function writeUserData(user, name, email) {
//     try {
//         const docRef = setDoc(doc(collection(database, "users"), user.uid), {
//           bio: "",
//           created_time: user.metadata.creationTime,          
//           display_name: name,
//           email: email,
//           phone_number: "123456789",
//           photo_url: "",
//           uid: user.uid,
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
// }

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Firestore.
//       const original = snap.data().original;

//       // Access the parameter `{documentId}` with `context.params`
//       functions.logger.log('Uppercasing', context.params.documentId, original);
      
//       const uppercase = original.toUpperCase();
      
//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to Firestore.
//       // Setting an 'uppercase' field in Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
//     });