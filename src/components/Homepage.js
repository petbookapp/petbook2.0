import React, { useEffect, useState } from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { writeUserData } from "./API";
import { auth, database} from '../firebase'
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { getPets } from "./API"
 
const dogs = [
  {
    name: 'Floofy',
    age: 10,
    breed: 'Golden Retriever'
  },
  {
    name: 'Boop',
    age: 5,
    breed: 'Shiba Inu'
  },
 
]


// const dogs = getPets(auth.currentUser.uid);


export default function Homepage() {
  const [error, setError] = useState("")
  const [pets, setPets] = useState("")
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
    <div class="nicebackground">
      <main class="main">
        <body>
          <aside class="sidebar">
              <nav class="nav">
                <ul>
                  <li class="active"><a href="/homepage">Your Pets</a></li>
                  <li><a href="/add-pet">Add Pet</a></li>
                  <li><a href="/account">Account</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li>
                    <a href="/login"><button onSubmit={handleLogout}>Logout</button></a>
                  </li>
                </ul>
              </nav>
            </aside>
          </body>
        </main>
        <ul style={{height: "100%"}}>
          <h2 style={{ fontSize: 25 }} class="text-center mb-4">
            <img class="logo" src="logo.png" alt="logo"/>
          </h2>
          <h2 style={{ fontSize: 20 }} class="text-center mb-4">
            {currentUser.email} 
          </h2>
            {Object.keys(dogs).map((key) => (
              <>
                <Card.Body>
                  {error && <Alert varient="danger">{error}</Alert>}
                  <div class="pet-container">
                    <div class="pet-card">
                      <img src="https://www.petmd.com/sites/default/files/2020-11/picture-of-golden-retriever-dog_0.jpg" alt="Chyno Deluxe"/>
                      <h1>{dogs[key]["name"]}</h1>
                      <h2>{dogs[key]["breed"]} {dogs[key]["age"]}</h2>
                      <a class="button" href={`/pet-info/${key}`} ><span>+</span> View</a>
                    </div>
                  </div>
                </Card.Body>
                </>
            ))}
        </ul>
    </div>
    </>
  )
}
 