import React, { useState } from "react"
import { useForm } from "react-hook-form";
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
import { errorMessage } from "../context/AuthContext"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;


export default function Signup() {
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)
    const [passwordShown2, setPasswordShown2] = useState(false)

    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
        //   console.log(user.metadata.creationTime);
          writeUserData(user, "bob", user.email)
          
        } else {
          // User is signed out
          // ...
        }
      });
    async function handleSubmit(e) {
        e.preventDefault()

        if(document.getElementById("password").value !==
        document.getElementById("confirm-password").value) {
            document.getElementById("passwordConfirmError").innerHTML = 'Passwords do not match';
            return;
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
            if(errorMessage === '1') {
                document.getElementById("passwordError").innerHTML = 'Passwords must be at least 6 characters long';
            }
            else {
               document.getElementById("emailError").innerHTML = errorMessage; 
            }
        }
        setLoading(false)
    }

    const signInWithGoogle = ()=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            navigate('/homepage');
          }).catch((error) => {
            setError(error.email);
            setError(GoogleAuthProvider.credentialFromError(error));
        });
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const togglePasswordVisiblity2 = () => {
        setPasswordShown2(passwordShown2 ? false : true);
      };

      

    return (
        <>
            <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>  
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            </head>
                <body class="login-form background">
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
                                                    <label for="name">Name</label>
                                                    <input id="name" placeHolder="Name" type="name" class="form-control" name="name"  required autofocus/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="email">Email Address</label>
                                                    <input id="email" placeHolder="Email Address" type="email" class="form-control" name="email"  required autofocus/>
                                                    <p><span class="error text-danger" id="emailError"></span></p>
                                                </div>
                                                <div class="form-group password">
                                                    <label for="password">Password
                                                    </label>
                                                    <input id="password" placeHolder="Password" type={passwordShown ? "text" : "password"} class="form-control" name="password" required data-eye/>
                                                    <i onClick={togglePasswordVisiblity}>{eye}</i>
                                                    <p><span class="error text-danger" id="passwordError"></span></p>
                                                </div>

                                                <div class="form-group confirm">
                                                    <label for="password">Confirm Password
                                                    </label>
                                                    <input id="confirm-password" placeHolder="Confirm Password" type={passwordShown2 ? "text" : "password"} class="form-control" name="confirm-password" required data-eye/>
                                                    <i onClick={togglePasswordVisiblity2}>{eye}</i>
                                                    <p><span class="error text-danger" id="passwordConfirmError"></span></p>
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