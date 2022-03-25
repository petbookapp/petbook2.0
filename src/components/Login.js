import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import "./App.css"


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value) 
            if(!auth.currentUser.emailVerified){
                setError('Please verify your email before logging in ')
                throw new error("Exception thrown");
            }
            navigate('/');
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
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Log In</h2>
                    {error && <Alert varient="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id ="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id ="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <div className= "w-100 text-center mt-2"></div>
                        <Button disabled={loading} className ="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className= "w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className= "w-100 text-center mt-2">
                or
            </div>
            <div className= "w-100 text-center mt-2"></div>
            <Card>
                <Card.Body>
                    <Button onClick={signInWithGoogle} disabled={loading} className ="w-100" type="submit">
                        Sign In with Google
                    </Button>
                    <div className= "w-100 text-center mt-2"></div>
                    <Button onClick={signInWithFacebook} disabled={loading} className ="w-100" type="submit">
                        Sign In with Facebook
                    </Button>
                </Card.Body>
            </Card>
            <div className= "w-100 text-center mt-2">
                Don't have an account? <a href='/signup'>Sign Up</a>
            </div>
        </>
    )
}