import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';
 
const dogObj = 
  {
    name: 'Floofy',
    age: 10,
    breed: 'Golden Retriever',
    food: 'Purina',
    walkTime: 30,
    favTreats: 'rice, tuna',
    birthday: '3/13/1998'
  }
 
 
export default function PetInfo(){
    const [error, setError] = useState("")
    const [petData, setPetData] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    let { id } = useParams();
 
    async function handleLogout() {
        setError('')
 
        try {
          await logout()
          navigate('/login')
        } catch{
          setError('Logout failed')
        }
      }
 
      useEffect(() => {
        /*fetch('your firebase data', requestOptions, {}).then(res => res.json())
        .then(result => setPetData(result))*/
        setPetData(dogObj)
      }, [])
 
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
                <Card.Body style={{minHeight: "100%"}}class="nicebackground pet-info-container">
                <h1 class="pet-name">{petData.name}</h1>
                  <table>
                    <tr>
                      <td>Name: </td>
                      <td><p class="pet-breed">{petData.name}</p></td>
                    </tr>
                    <tr>
                      <td>Food:</td>
                      <td><p class="pet-age">{petData.age}</p></td>
                      <td><p class="pet-age">{petData.food}</p></td>
                    </tr>
                  <p class="pet-age">{petData.walkTime}</p>
                  </table>
                </Card.Body>
 
            </main>
            </>
    )
}