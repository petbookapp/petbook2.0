import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import "./styles.css"


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signInForm = document.getElementById('sign-in-form')

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

signInForm.addEventListener('submit', (e) => {
    e.preventDefault()
    window.location.pathname = '/forgot-password.html'
});


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    
    async function sendtoPage() {
        
    }


    const signInWithGoogle = ()=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            //navigate('/');
          }).catch((error) => {
            setError(error.email);
            setError(GoogleAuthProvider.credentialFromError(error));
        });
    }

    const signInWithFacebook = ()=> {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            //navigate('/');
          }).catch((error) => {
            setError(error.email);
            setError(FacebookAuthProvider.credentialFromError(error));
        });
    }
}