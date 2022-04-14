import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Form, Button, Alert } from "react-bootstrap"

export default function Account(){
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const emailRef = useRef();
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogout() {
        setError('')
    
        try {
          await logout()
          navigate('/login')
        } catch{
          setError('Logout failed')
        }
      }

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
            <main class="main">
            <body>
                <aside class="sidebar">
                    <nav class="nav">
                    <ul>
                        <li><a href="/homepage">Pets</a></li>
                        <li class="active"><a href="/account">Account</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/login"><button onSubmit={handleLogout}>Logout</button></a></li>
                    </ul>
                    </nav>
                </aside>
                </body>
            </main>
            <body class="login-form nicebackground">
            <h2 style={{ fontSize: 25 }} className="text-center mb-4">Email: {currentUser.email}</h2>
                    <section class="h-100">
                        <div class="container h-100">
                            <div class="row justify-content-md-center h-100">
                                <div class="card-wrapper">
                                    <div class="card fat">
                                        <div class="card-body">
                                            <h4 class="card-title">Change Password</h4>
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