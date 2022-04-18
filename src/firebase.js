import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
    apiKey: "AIzaSyC5r3y-xuGnSjXSAc-Khae5HTa0Yu8s0kA",
    authDomain: "petbookweb-9621c.firebaseapp.com",
    projectId: "petbookweb-9621c",
    storageBucket: "petbookweb-9621c.appspot.com",
    messagingSenderId: "718590839151",
    appId: "1:718590839151:web:5d874c1cd6776c5a2dc09a",
    measurementId: "G-Q2CRJ5EFBQ"
  });

  export const auth = app.auth();
  export default app
  export const database = getFirestore(app)
  export const storage = getStorage(app);


