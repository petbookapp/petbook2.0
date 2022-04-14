import React, { useEffect, useState } from 'react'
import { Card, Alert } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth, database} from '../firebase'
import { doc, getDoc } from "firebase/firestore";


export default function Homepage() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [pet, setPet] = useState("")
  let { id } = useParams()
  
  useEffect(() => {
    getPet(id)
  }, []);

  async function getPet(id) {
    let petData = []
    try {
      const docRef = doc(database, "pets", id);
      const snapshot = await getDoc(docRef)
      
      petData.push({...snapshot.data()})
      console.log(petData[0].petName)
      setPet(petData)
      
    } catch {
      console.log("No such document!");
    }
  }
  
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />
      <div class="container nicebackground">
        <main className="main">
          <body>
            <aside className="sidebar">
                <nav className="nav">
                  <ul>
                    <li className="active"><a href="/homepage">Pets</a></li>
                    <li><a href="/add-pet">Add Pet</a></li>
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
          <h2 style={{ fontSize: 25 }} className="text-center mb-4">
                <img className="logo center-margin4" src="/logo.png" alt="logo"/>
            </h2>
          {Object.keys(pet).map((key) => (
              <>
                <div class="team-single center-margin3">
                    <div class="row">
                        <div class="col-lg-4 col-md-5 xs-margin-30px-bottom">
                            <div class="team-single-img">
                                <img src={pet[key]["petPhoto"]} alt="MyPet"/>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-7">
                            <div class="team-single-text padding-50px-left sm-no-padding-left">
                                <div class="contact-info-section margin-40px-tb">
                                    <ul class="list-style9 no-margin">
                                    <li>
                                    <div class="row">
                                        <div class="col-md-5 col-5">
                                          <i class="fas fa-solid fa-trash text-black"></i>
                                          <strong class="margin-10px-left text-orange"><button>Delete</button></strong>
                                        </div>
                                        <div class="col-md-7 col-7">
                                          <i class="fas fa-solid fa-pen text-blue"></i>
                                          <strong class="margin-10px-left text-orange"><button2 className='edit'>Edit</button2></strong>
                                        </div>
                                    </div>

                                    </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-solid fa-file text-orange"></i>
                                                    <strong class="margin-10px-left text-orange">Name:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{pet[key]["petName"]}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-purple"></i>
                                                    <strong class="margin-10px-left text-purple">Type:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{pet[key]["petType"]}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-lightred"></i>
                                                    <strong class="margin-10px-left text-lightred">Breed:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{pet[key]["petBreed"]}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-green"></i>
                                                    <strong class="margin-10px-left text-green">Age:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{pet[key]["petAge"]}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-user text-purple"></i>
                                                    <strong class="margin-10px-left xs-margin-four-left text-purple">Owner:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{auth.currentUser.displayName}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>
                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-envelope text-pink"></i>
                                                    <strong class="margin-10px-left xs-margin-four-left text-pink">Email:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p><a href="/homepage">{auth.currentUser.email}</a></p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12"></div>
                    </div>
                </div>
                </>
            ))}
      </div>
    </>
  )
}
 