import React, { useEffect, useState } from 'react'
import { Card, Alert, Modal } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth, database} from '../firebase'
import { collection, getDocs, query, where} from "firebase/firestore"; 
import AddPet from "./AddPet"

export default function Homepage() {
  const [error, setError] = useState("")
  const [pets, setPets] = useState("")
  const [petID, setPetID] = useState("")
  const { logout } = useAuth()
  const [show, setShow] = useState(false)
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

  function close() {
    getPets(auth.currentUser.uid)
    closeAdd()
  }

  const showAdd = () => setShow(true)
  const closeAdd = () => setShow(false)
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />
    <div className="nicebackground">
      <main className="main">
        <body>
          <aside className="sidebar">
              <nav className="nav">
                <ul>
                  <li className="active"><a href="/homepage">Pets</a></li>
                  <li><a href="/account">Account</a></li>
                  <li><a href="/about">About</a></li>
                  <li>
                    <a href="/login"><button onSubmit={handleLogout}>Logout</button></a>
                  </li>
                </ul>
              </nav>
            </aside>
          </body>
        </main>
        <ul style={{height: "100%"}}>
          <h2>
            <div className="team-single">
              <i class="fas fa-solid fa-plus text-green left-margin"></i>
              <strong class="text-green"><button3 onClick={showAdd} className="greenColor">Add Pet</button3></strong>
              <img className="logo right-margin" src="logo.png" alt="logo"/>
            </div>
            
            
          </h2>
          <div class="container-fluid row row-cols-2 row-cols-sm-3 g-1">
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

    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add Pet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddPet />
      </Modal.Body>
    </Modal>
    </>
  )
}
 