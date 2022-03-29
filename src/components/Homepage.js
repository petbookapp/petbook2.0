import React, { useState } from 'react'
import { Card, Button, Alert, Navbar, Nav, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Homepage() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch{
      setError('Logout failed')
    }
  }
  // async function handleChangeEmail() {
  //   navigate('/update-email')
  // }

  return (
    <>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        {error && <Alert varient="danger">{error}</Alert>}
        <strong>User Logged In: </strong>{currentUser.email}
      </Card.Body>
      <div className="w-100 text-center mt-2">
        <Button onClick={handleLogout} className ="w-100" type="submit"><span>Logout</span></Button>
      </div>
    </>
  )
}
