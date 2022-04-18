import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card } from "react-bootstrap"

export default function About(){
    const [setError] = useState("")
    const { logout } = useAuth()
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
                    <li><a href="/homepage">Pets</a></li>
                    <li><a href="/account">Account</a></li>
                    <li class="active"><a href="/about">About</a></li>
                    <li><a href="/login"><button onSubmit={handleLogout}>Logout</button></a></li>
                </ul>
                </nav>
            </aside>
            </body>
        </main>
        <body style={{minHeight: "100vh"}} class="login-form nicebackground d-flex allign-items-center justify-content-center">
        <section> 
                <div class="aboutus-container">
                        <div class="row justify-content-md-center">
                            <div class="card-wrapper">
                                <div class="brand">
                                </div>
                                <div class="card fat">
                                    <div class="card-body">
                                    <h2 className = "text-center mb-4">About Us</h2>

                                     <div class="card-body">
                                    <div className= "w-100 text-center mt-2">
                                      <p>COP4331 Big Project, Pet Manager: Spring 2022</p>
                                      <p>The objective of this project was to design & develop a Pet Manager using Firebase, React, CSS, JavaScript, and Flutter</p>
                                      
                                        <p><strong>API</strong>: Mohammad Abdulwahab, Tahsin Islam</p>
                                        <p><strong>Front-End</strong>: Leonardo Grespan, Sakun Chitraacharige, Kevin Jimenez</p>
                                        <p><strong>Database</strong>: Robert Uriarte</p>
                                        <p><strong>Project Manager</strong>: Mathew Liu</p>
                                      
                                      <p>Source code can be found <a href="#">here</a></p>
                                    </div>
                                    </div>
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