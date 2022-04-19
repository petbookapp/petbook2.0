import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth, database} from '../firebase'
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';


export default function PetInfo() {

  const [Name, setName] = useState("")
  const [petName, setpetName] = useState("")
  const [petGender, setGender] = useState("")
  const [petWeight, setWeight] = useState("")
  const [petBreed, setBreed] = useState("")
  const [petType, setType] = useState("")
  const [petAge, setAge] = useState("")
  const [petPhoto, setPhoto] = useState("")
  const [Phone, setPhone] = useState("")
  let { id } = useParams()
  
  useEffect(() => {
    getPet(id)
    getUser()
  }, [id]);

  async function getUser() {
    let userData = []
    try {
      const docRef = doc(database, "users", auth.currentUser.uid);
      const snapshot = await getDoc(docRef)
      
      userData.push({...snapshot.data()})


      setName(snapshot.data().display_name)
      setPhone(snapshot.data().phone_number)
      
    } catch {
      console.log("No such document!");
    }
  }

  async function getPet(id) {
    
    try {
      const docRef = doc(database, "pets", id);
      const snapshot = await getDoc(docRef)
      console.log(snapshot.data().petName)
      
      setpetName(snapshot.data().petName);
      setGender(snapshot.data().petGender);
      setWeight(snapshot.data().petWeight);
      setType(snapshot.data().petType);
      setBreed(snapshot.data().petBreed);
      setAge(snapshot.data().petAge);
      setPhoto(snapshot.data().petPhoto);
      
      
    } catch {
      console.log("No such document!");
    }
  }



  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossOrigin="anonymous" />
      <div class="container nicebackground">
          <h2 style={{ fontSize: 25 }} className="text-center mb-4">
                <img className="logo center-margin4" src="/logo.png" alt="logo"/>
            </h2>
                <div class="team-single center-margin3">
                    <div class="row">
                        <div class="col-lg-4 col-md-5 xs-margin-30px-bottom">
                            <div class="team-single-img">
                                <img src={petPhoto} alt="MyPet"/>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-7">
                            <div class="team-single-text padding-50px-left sm-no-padding-left">
                                <div class="contact-info-section margin-40px-tb">
                                    <ul class="list-style9 no-margin">
                                        <li>
                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-solid fa-file text-orange"></i>
                                                    <strong class="margin-10px-left text-orange">Name:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{petName} </p>
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
                                                    <p>{petType}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-green"></i>
                                                    <strong class="margin-10px-left text-green">Breed:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{petBreed}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-pink"></i>
                                                    <strong class="margin-10px-left text-pink">Age:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{petAge}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>
                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-lightred"></i>
                                                    <strong class="margin-10px-left text-lightred">Gender:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{petGender}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-purple"></i>
                                                    <strong class="margin-10px-left text-purple">Weight:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{petWeight}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-user text-green"></i>
                                                    <strong class="margin-10px-left xs-margin-four-left text-green">Owner:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{Name}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>
                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-mobile text-pink"></i>
                                                    <strong class="margin-10px-left xs-margin-four-left text-pink">Phone Number:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{Phone}</p>
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
      </div>
    </>
  )
}
 