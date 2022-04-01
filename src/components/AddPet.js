import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AddPet(){
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
                        <li><a href="/">Your Pets</a></li>
                        <li class="active"><a href="/add-pet">Add Pet</a></li>
                        <li><a href="/account">Account</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><button className ="w-100" onClick={handleLogout}   type="submit">Logout</button></li>
                    </ul>
                    </nav>
                </aside>
                </body>
            </main>
            <body style={{minHeight: "100vh"}} class="nicebackground">
                <p class="d-flex allign-items-center justify-content-center">Add pet stuff</p>
            </body>
            </>
    )
}