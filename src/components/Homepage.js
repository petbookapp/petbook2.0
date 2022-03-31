import React, { useState } from 'react'
import { Card, Button, Alert } from "react-bootstrap"
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

  return (
    <>
     <main class="main">
       <body>
         <aside class="sidebar">
            <nav class="nav">
              <ul>
                <li class="active"><a href="/">Your Pets</a></li>
                <li><a href="/pet-info">Pet Info</a></li>
                <li><a href="/account">Account</a></li>
                <li><a href="/about">About Us</a></li>
                <li><button className ="w-100" onClick={handleLogout}   type="submit">Logout</button></li>
              </ul>
            </nav>
          </aside>
        </body>
      </main>
      <Card.Body>
        <h2 style={{ fontSize: 25 }} className="text-center mb-4">{currentUser.email}</h2>
        {error && <Alert varient="danger">{error}</Alert>}
        <div class="pet-container">
          <div class="pet-card">
            <img src="https://www.petmd.com/sites/default/files/2020-11/picture-of-golden-retriever-dog_0.jpg" alt="Chyno Deluxe"/>
            <h1>Max</h1>
            <h2>Golden Retriever 10</h2>
            <a class="button" href="/" ><span>+</span> View</a>
          </div>
        </div>
      </Card.Body>
      
    </>
  )
}
