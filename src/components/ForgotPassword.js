import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link } from "react-router-dom"

export default function ForgotPassowrd() {
    const emailRef = useRef();
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            setMessage('')
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Reset Link sent to Email')
        } catch {
            setError('Failed to Reset Password')
        }
        setLoading(false)
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
                                            <h4 class="card-title">Password Reset</h4>
                                            {error && <Alert varient="danger">{error}</Alert>}
                                            {message && <Alert varient="success">{message}</Alert>}
                                            <Form onSubmit={handleSubmit}>
                                            <Form.Group id ="email">
                                                <Form.Label>Please enter your email</Form.Label>
                                                <Form.Control placeHolder="Email" type="email" ref={emailRef} required />
                                            </Form.Group>
                                            <div className= "w-100 text-center mt-2"></div> 
                                            <Button disabled={loading} className ="w-100" type="submit">
                                                <span>Reset Password</span>
                                            </Button>
                                        </Form>
                                            <form class="signup-form">
                                                <div class="mt-4 text-center">
                                                   Return to <a href="/login">Login</a>
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