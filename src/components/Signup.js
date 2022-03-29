import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from '../firebase'
import GoogleButton from 'react-google-button'
import { FacebookLoginButton } from "react-social-login-buttons";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if(document.getElementById("password").value !==
        document.getElementById("confirm-password").value) {
            return setError('Passwords do not match')
        }
        
        try {
            setError("")
            setLoading(true)
            await signup(document.getElementById("email").value, document.getElementById("password").value)
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
                <body class="my-login-page">
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
                                                    <button type="submit" onClick={handleSubmit} class="btn btn-primary btn-block">
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