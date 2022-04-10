import React, { useEffect, useState } from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { writeUserData } from "./API";
import { auth, database} from '../firebase'
import { getPets } from "./API"
import { collection, addDoc, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where} from "firebase/firestore"; 

export default function Homepage() {
  const [error, setError] = useState("")
  const [pets, setPets] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  
  let petsData  = []

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch{
      setError('Logout failed')
    }
  }

  function getPets(userId) {
    
    try {
        const q = query(collection(database, "pets"), where("userAssociation", "==", userId));
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              petsData.push({...doc.data()})
            })
        }).catch((err) => {
          console.log("an error occurred")
        });
        
      } catch (e) {
        console.error("API ERROR ", e);
      }
  }

  getPets(auth.currentUser.uid)
 
  return (
    <>
    <div className="nicebackground">
      <main className="main">
        <body>
          <aside className="sidebar">
              <nav className="nav">
                <ul>
                  <li className="active"><a href="/homepage">Your Pets</a></li>
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
          <h2 style={{ fontSize: 25 }} className="text-center mb-4">
            <img className="logo" src="logo.png" alt="logo"/>
          </h2>
          <h2 style={{ fontSize: 20 }} className="text-center mb-4">
            {currentUser.email} 
          </h2>
        </ul>
    </div>
    </>
  )
}
 