import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link } from "react-router-dom"
import "./styles.css"

document.write('hello')
const dabutton = document.getElementById('yo')
dabutton.addEventListener('click', () => {
    alert('hello')
});


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

}