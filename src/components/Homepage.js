import React, { useEffect, useState } from 'react'
import { Card, Alert } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth, database} from '../firebase'
import { collection, getDocs, query, where} from "firebase/firestore"; 


export default function Homepage() {
  const [error, setError] = useState("")
  const [pets, setPets] = useState("")
  const [petID, setPetID] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    getPets(auth.currentUser.uid)
  }, []);

  
  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch{
      setError('Logout failed')
    }
  }

  async function getPets(userId) {
    let petsData = []
    let petsID = []
    try {
        const q = query(collection(database, "pets"), where("userAssociation", "==", userId));
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              petsData.push({...doc.data()})
              petsID.push(doc.id)
            })

            setPetID(petsID)
            setPets(petsData)
        }).catch((err) => {
          console.log("an error occurred")
        });
        
      } catch (e) {
        console.error("API ERROR ", e);
      }
  }

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
          <div class="container-fluid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-3 gutters-sm">
          {Object.keys(pets).map((key) => (
              <>
                <Card.Body>
                  {error && <Alert varient="danger">{error}</Alert>}
                  <div class="pet-container">
                    <div class="pet-card">
                      <img src={pets[key]["petPhoto"]} alt="My Pet"/>
                      <h1>{pets[key]["petName"]}</h1>
                      <h2>{pets[key]["petBreed"]}</h2>
                      <a class="button" href={`/pet-info/${petID[Number(key)]}`} ><span>+</span> View</a>
                    </div>
                  </div>
                </Card.Body>
                </>
            ))}
            </div>
        </ul>
    </div>
    </>
  )
}
 