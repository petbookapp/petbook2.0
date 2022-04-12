import React, { useEffect, useState } from 'react'
import { Card, Alert } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth, database} from '../firebase'
import { doc, getDoc } from "firebase/firestore";


export default function Homepage() {
  const [error, setError] = useState("")
  const [pets, setPets] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  let { id } = useParams()
  
  useEffect(() => {

    async function getPet(userId) {
      let petsData = []
      const docRef = doc(database, "pets", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        petsData.push({...docSnap.data()})
        setPets(petsData)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getPet(auth.currentUser.uid)
  }, [id]);

  
  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch{
      setError('Logout failed')
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
                  <li><a href="/homepage">Your Pets</a></li>
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
            <img className="logo" src="/logo.png" alt="logo"/>
          </h2>
          {Object.keys(pets).map((key) => (
              <>
                <Card.Body>
                  {error && <Alert varient="danger">{error}</Alert>}
                  <div class="pet-container">
                    <div class="pet-card">
                      <img src={pets[key]["petPhoto"]} alt="My Pet"/>
                      <h1>{pets[key]["petName"]}</h1>
                      <h2>{pets[key]["petBreed"]}</h2>
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
 