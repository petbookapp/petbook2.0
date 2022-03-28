import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
//import "./style.css"

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

        if(passwordRef.current.value !==
        passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/emailverification');
        } catch {

        }
        setLoading(false)
    }

    async function myFunction() {
        
    }

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        handleSubmit();
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    return (
        <>
            <div class="container" id="container">
            <div class="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div class="social-container">
                        <a href="/" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="/" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="/" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form action="#">
                    <h1>PetBook</h1>
                    <div class="social-container">
                        <a href="/" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="/" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="/" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="/">Forgot your password?</a>
                    <button onClick={handleSubmit}>Sign In</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button class="ghost" id="signIn">Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Don't have an account?</h1>
                        <p>Get started here and start your pet care journey</p>
                        <button class="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}