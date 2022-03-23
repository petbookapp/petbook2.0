import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyByhVDppQflaACGxE0TK45KEAHWh7ASv6I",
    authDomain: "group1-3548e.firebaseapp.com",
    databaseURL: "https://group1-3548e-default-rtdb.firebaseio.com",
    projectId: "group1-3548e",
    storageBucket: "group1-3548e.appspot.com",
    messagingSenderId: "513050052130",
    appId: "1:513050052130:web:d40afad04639e68fd7ac7b",
    measurementId: "G-JV72FRF550"
  });

  export const auth = app.auth();
  export default app