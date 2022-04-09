import React, { useState } from "react"
import { useAuth } from '../context/AuthContext'
import { Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from 'react-google-button'
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, set, ref } from 'firebase/database';
import { errorMessage } from "../context/AuthContext"
import { toast } from "react-toastify"



export default function Login() {
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    function writeUserData(userId, name, email) {
        set(ref(getDatabase, 'User UID/' + userId), {
          username: name,
          email: email,
        });
    }
    // onAuthStateChanged(auth, (user) => {
    //     // console.log(user.metadata.lastLoginAt + " .  " + user.metadata.createdAt)
    //     if ((user.metadata.lastLoginAt - user.metadata.createdAt) <= 1)
    //     {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             const uid = user.uid;
    //             writeUserData(uid, "322332", user.email)
                
    //           } else {
    //             // User is signed out
    //             // ...
    //           }

    //     }

    //   });

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            // const data = {"Email"}
            await login(document.getElementById("email").value, document.getElementById("password").value);
            if(!auth.currentUser.emailVerified){
                setError("Please Verify Your Email Address", {position: toast.POSITION.BOTTOM_CENTER});
                throw new error("Exception thrown");
            }
            // database.ref().push();
            navigate('/homepage');
        } catch {
            if(errorMessage === '1') {
                document.getElementById("passwordError").innerHTML = 'Incorrect Password';
            }
            else if(errorMessage === ""){
                document.getElementById("passwordError").innerHTML = '';
                document.getElementById("emailError").innerHTML = '';
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
        }).then();
    }

    return (
        <>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
            <body style={{minHeight: "100vh"}} class="login-form background d-flex allign-items-center justify-content-center">
                <section>
                    <div class="mycontainer">
                        <div class="row justify-content-md-center">
                            <div class="card-wrapper">
                                <div class="brand">
                                    <img src="logo.png" alt="logo"/>
                                </div>
                                <div class="card fat">
                                    <div class="card-body">
                                        <h4 class="card-title">Login</h4>
                                        {error && <Alert varient="danger">{error}</Alert>}
                                        <form class="login-form">
                                            <div class="form-group">
                                                <label for="email">Email Address</label>
                                                <input id="email" placeHolder="Email Address" type="email" class="form-control" name="email"  required autofocus/>
                                                <p><span class="error text-danger" id="emailError"></span></p>
                                            </div>

                                            <div class="form-group">
                                                <label for="password">Password
                                                </label>
                                                <input id="password" placeHolder="Password" type="password" class="form-control" name="password" required data-eye/>
                                                <a href="/forgot-password" class="float-right">
                                                    Forgot Password?
                                                </a>
                                                <p><span class="error text-danger" id="passwordError"></span></p>
                                            </div>

                                            <div class="form-group">
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" name="remember" id="remember" class="custom-control-input"/>
                                                    <label for="remember" class="custom-control-label">Remember Me</label>
                                                </div>
                                            </div>

                                            <div class="form-group m-0">
                                                <button type="submit" disabled={loading} onClick={handleSubmit} class="btn btn-primary btn-block">
                                                    <span>Login</span>
                                                </button>
                                            </div>
                                            <div className= "w-100 text-center mt-2">
                                            ━━━━━━━━━━━━━━━━━━━ &nbsp;&nbsp; OR &nbsp;&nbsp;━━━━━━━━━━━━━━━━━━━
                                            </div>
                                            <div className= "w-100 text-center mt-2"></div>
                                            <div class="form-group m-0">
                                                <GoogleButton style={{ width:310,height:50}} type="dark" disabled={loading} onClick={signInWithGoogle} className="stylegoogleButton"/>
                                                
                                            </div>
                                            <div class="mt-4 text-center">
                                                Don't have an account? <a href="/signup">Sign Up</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        </>
    )
}