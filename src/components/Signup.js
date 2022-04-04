import React, { useState } from "react"
import { Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import GoogleButton from 'react-google-button'
import { FacebookLoginButton } from "react-social-login-buttons";
import { auth, database} from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { set, ref } from 'firebase/database'
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore"; 
import { writeUserData } from "./API";


export default function Signup() {
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
   
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          writeUserData(uid, "bob", user.email)
          
        } else {
          // User is signed out
          // ...
        }
      });
    async function handleSubmit(e) {
        e.preventDefault()

        if(document.getElementById("password").value !==
        document.getElementById("confirm-password").value) {
            return setError('Passwords do not match')
        }
        try {
            setError("")
            setLoading(true)
            var email = document.getElementById("email").value; 
            await signup(email, document.getElementById("password").value
            )
            // .then(function () 
            //     {
            //         return writeUserData(auth.currentUser.id, 'bob', email)
            //     }
            // )
            // alert(auth.currentUser.id);

            navigate('/emailverification');
        } catch {

        }
        setLoading(false)
    }

    const signInWithGoogle = ()=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            navigate('/');
          }).catch((error) => {
            setError(error.email);
            setError(GoogleAuthProvider.credentialFromError(error));
        });
    }

    const signInWithFacebook = ()=> {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            navigate('/');
          }).catch((error) => {
            setError(error.email);
            setError(FacebookAuthProvider.credentialFromError(error));
        });
    }

    return (
        <>
            <html lang="en">
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            </head>
                <body class="login-form">
                    <section class="h-100">
                        <div class="container h-100">
                            <div class="row justify-content-md-center h-100">
                                <div class="card-wrapper">
                                    <div class="brand">
                                        <img src="logo.png" alt="logo"/>
                                    </div>
                                    <div class="card fat">
                                        <div class="card-body">
                                            <h4 class="card-title">Sign Up</h4>
                                            {error && <Alert varient="danger">{error}</Alert>}
                                            <form class="signup-form">
                                                <div class="form-group">
                                                    <label for="email">Email Address</label>
                                                    <input id="email" placeHolder="Email Address" type="email" class="form-control" name="email"  required autofocus/>
                                                    <div class="invalid-feedback">
                                                        Email is invalid
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="password">Password
                                                    </label>
                                                    <input id="password" placeHolder="Password" type="password" class="form-control" name="password" required data-eye/>
                                                    <div class="invalid-feedback">
                                                        Password is required
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="password">Confirm Password
                                                    </label>
                                                    <input id="confirm-password" placeHolder="Confirm Password" type="password" class="form-control" name="password" required data-eye/>
                                                </div>

                                                <div class="form-group m-0">
                                                    <button type="submit" disabled={loading} onClick={handleSubmit} class="btn btn-primary btn-block">
                                                        <span>Sign Up</span>
                                                    </button>
                                                </div>
                                                <div className= "w-100 text-center mt-2">
                                                ━━━━━━━━━━━━━━━━━━━ &nbsp;&nbsp; OR &nbsp;&nbsp;━━━━━━━━━━━━━━━━━━━
                                                </div>
                                                <div className= "w-100 text-center mt-2"></div>
                                                <div class="form-group ">
                                                    <FacebookLoginButton style={{ width:310,height:50}} text='Sign Up with Facebook' onClick={signInWithFacebook} className="stylefacebookButton"/> 
                                                </div>
                                                <div className= "w-100 text-center mt-2"></div>
                                                <div class="form-group m-0">
                                                    <GoogleButton style={{ width:310,height:50}} label='Sign Up with Google' onClick={signInWithGoogle} className="stylegoogleButton"/>
                                                </div>
                                                <div class="mt-4 text-center">
                                                    Already have an account? <a href="/login">Sign In</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </body>
            </html>
        </>
    )
}