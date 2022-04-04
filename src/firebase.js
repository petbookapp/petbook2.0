import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore} from "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBkb07TikkGrdL7uNrvJZQ_yeOYHyqxSCw",
    authDomain: "snout-371aa.firebaseapp.com",
    projectId: "snout-371aa",
    storageBucket: "snout-371aa.appspot.com",
    messagingSenderId: "228922545435",
    appId: "1:228922545435:web:509c75422ba561c8ba6fbe",
    measurementId: "G-ZMT5W1X5BQ"
  });

  export const auth = app.auth();
  export default app
  export const database = getFirestore(app)