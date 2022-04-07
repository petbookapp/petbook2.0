import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { writePet } from "./API"
import { auth } from '../firebase'

export default function AddPet(){
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    async function handleLogout() {
        setError('')
    
        try {
          await logout()
          navigate('/login')
        } catch{
          setError('Logout failed')
        }
      }

      async function handleSubmit() {
        const petName = document.getElementById("petName").value
        const petBreed = document.getElementById("petBreed").value
        const petAge = document.getElementById("petAge").value

        writePet(auth.currentUser.uid, petName, petBreed, petBreed, petAge);
      }

      async function handleAddPet(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)

            const petName = document.getElementById("petName").value
            const petBreed = document.getElementById("petBreed").value
            const petAge = document.getElementById("petAge").value

            writePet(auth.currentUser.uid, petAge,"Dog", petBreed, petName);

            // navigate('/');
        } catch {
            alert('add pet function didnt work')
        }
        setLoading(false)
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
                            <li><a href="/login"><button onSubmit={handleLogout}>Logout</button></a></li>
                        </ul>
                        </nav>
                    </aside>
                </body>
                </main>
                <body style={{minHeight: "100vh"}} class="nicebackground login-form d-flex allign-items-center justify-content-center">
                    <section>
                        <div class="mycontainer">
                            <div class="row justify-content-md-center">
                                <div class="card-wrapper">
                                    <div class="brand">
                                        <img src="logo.png" alt="logo"/>
                                    </div>
                                    <div class="card fat">
                                        <div class="card-body">
                                            <h4 class="card-title">Add Pet</h4>
                                            <form class="login-form">
                                                <div class="form-group">
                                                    <label for="petName">Name</label>
                                                    <div className= "w-100 text-center mt-2"></div>
                                                    <input id="petName" placeHolder="Name" type="petName" class="form-control" name="petName"  required autofocus/>
                                                    <div class="invalid-feedback">
                                                        Email is invalid
                                                    </div>
                                                </div>
                                                <div className= "w-100 text-center mt-2"></div>
                                                <div class="form-group">
                                                    <label for="petBreed">Breed
                                                    <div className= "w-100 text-center mt-2"></div>
                                                    </label>
                                                    <input id="petBreed" placeHolder="Breed" type="petBreed" class="form-control" name="petBreed" required data-eye/>
                                                    <div class="invalid-feedback">
                                                        Password is required
                                                    </div>
                                                </div>
                                                <div className= "w-100 text-center mt-2"></div>
                                                <div class="form-group">
                                                    <label for="petAge">Age
                                                    <div className= "w-100 text-center mt-2"></div>
                                                    </label>
                                                    <input id="petAge" placeHolder="Age" type="petAge" class="form-control" name="petAge" required data-eye/>
                                                    <div class="invalid-feedback">
                                                        Password is required
                                                    </div>
                                                </div>
                                                <div className= "w-100 text-center mt-2"></div>
                                                <div class="form-group m-0">
                                                    <button type="submit"  onClick={handleAddPet} class="btn btn-primary btn-block">
                                                        <span>Add Pet</span>
                                                    </button>
                                                </div>
                                            </form>
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