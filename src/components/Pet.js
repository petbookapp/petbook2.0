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
    <div class="container" style={{ backgroundColor: "#F7EDE2", padding:'0', margin:'0', width:'100%'}}>
        <div>
            <center><img className="logo" src="/logo.png" alt="logo"/></center>
        </div>
        <div className = "row">
            <div className='col-md'>
                <h1>{petName}</h1>
            </div>
            <div className='col-md'>
                <img src = {petPhoto} alt='My Pet' style={{maxWidth:'45%', borderRadius:'100px'}}></img>
            </div>
        </div>

    </div>
    </>
  )
}
