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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="/">Home</a>
        <a class="nav-link" href="/">Features</a>
        <a class="nav-link" href="/">Pricing</a>
      </div>
    </div>
  </div>
</nav>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        {error && <Alert varient="danger">{error}</Alert>}
        <strong>User Logged In: </strong>{currentUser.email}
      </Card.Body>
      <div className="w-100 text-center mt-2">
        <Button onClick={handleLogout} className ="w-100" type="submit">Logout</Button>
      </div>
    </>
  )
}
