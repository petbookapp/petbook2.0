import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

export default function UpdateEmaiil() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
         e.preventDefault()

         if(passwordRef.current.value !==
         passwordConfirmRef.current.value) {
             return setError('Passwords do not match')
         }

         if(passwordRef.current.value !== currentUser.password) {
             return setError('Password is incorrect')
         }
         else {
             setError('')
            currentUser.UpdateEmaiil(emailRef)
            navigate('/')
            setLoading(false)
        }
         
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Change your email</h2>
                    {error && <Alert varient="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id ="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required 
                            deafaultValue ={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id ="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id ="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <div className= "w-100 text-center mt-2"></div>
                        <Button disabled={loading} className ="w-100" type="submit">
                            Confirm Change
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className= "w-100 text-center mt-2">
                Don't want to change your email? <a href='/'>cancel</a>
            </div>
        </>
    )
}