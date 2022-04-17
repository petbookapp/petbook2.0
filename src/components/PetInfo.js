import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth, database} from '../firebase'
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPet from "./EditPet"


export default function PetInfo() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [pet, setPet] = useState("")
  const [Name, setName] = useState("")
  const [Phone, setPhone] = useState("")
  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  let { id } = useParams()

  async function getUser() {
    let userData = []
    try {
      const docRef = doc(database, "users", auth.currentUser.uid);
      const snapshot = await getDoc(docRef)
      
      userData.push({...snapshot.data()})

      setName(userData[0]["display_name"])
      setPhone(userData[0]["phone_number"])
      
    } catch {
      console.log("No such document!");
    }
  }

  async function getPet(id) {
    let petData = []
    try {
      const docRef = doc(database, "pets", id);
      const snapshot = await getDoc(docRef)
      
      petData.push({...snapshot.data()})
      setPet(petData)
      
    } catch {
      console.log("No such document!");
    }
  }
  async function deletePet() {
    try{
      const docRef = doc(database, "pets", id)
      await deleteDoc(docRef)
      .then(()=> {
        navigate("/homepage");
        toast.info("Pet Deleted", {position: toast.POSITION.TOP_RIGHT});
      })
    } catch {

    }
  }
  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch{
    }
  }

  function close() {
    getPet(id)
    closeEdit()
  }

  const showEdit = () => setShow(true)
  const closeEdit = () => setShow(false)
  
  const openDelete = () => setShowDelete(true)
  const closeDelete = () => setShowDelete(false)

  return (
    <>
      Hello
    </>
  )
}
 