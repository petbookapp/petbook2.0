import React, { useEffect, useState } from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
<<<<<<< HEAD
import { auth } from '../firebase'
import { writeUserData } from "./API";


=======
import { auth, database} from '../firebase'
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
 
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
 
>>>>>>> 16d9a7837221e70b288318b4797bf797d3c16c1f
export default function Homepage() {
  const [error, setError] = useState("")
  const [pets, setPets] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const user = auth.currentUser;
<<<<<<< HEAD

=======
 
  useEffect(() => {
    let authCode = ''
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', "Authorization": authCode},
      body: JSON.stringify({
        query: ``,
        variables: {}
      })
  };
 
    /*fetch('https://api.monday.com/v2', requestOptions, {}).then(res => res.json())
    .then((result) => {
      alert(JSON.stringify(result))
      setPets(result)
      alert(pets.data[account_id])
    })*/
  }, [])
 
  function writeUserData(pAge, pType, pBreed, pName) {
    try {
        const docRef = setDoc(doc(collection(database, "pets"), user), {
            name: pName,
            age: pAge,
            type: pType,
            breed: pBreed
        });
 
 
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    // set(ref(database, 'User UID/' + userId), {
    //   username: name,
    //   email: email,
    // });
}
 
>>>>>>> 16d9a7837221e70b288318b4797bf797d3c16c1f
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
                  <li class="active"><a href="/">Your Pets</a></li>
                  <li><a href="/add-pet">Add Pet</a></li>
                  <li><a href="/account">Account</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><button className ="w-100" onClick={handleLogout}   type="submit">Logout</button></li>
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
 