import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from 
'react-router-dom'
import Homepage from "./Homepage"
import Login from "./Login"
import ForgotPassowrd from "./ForgotPassword"
import EmailVerification from "./EmailVerification"
import PetInfo from "./PetInfo"
import Account from "./Account"
import About from "./AboutUs"
import AddPet from "./AddPet"
import LandingPage from "./LandingPage"
import Pet from "./Pet"

function App() {
  return (
    <div className="mycontainer">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}></Route>
            <Route exact path="/homepage" element={<Homepage/>}></Route>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/emailverification" element={<EmailVerification/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/forgot-password" element={<ForgotPassowrd/>}/>
            <Route path="/add-pet" element={<AddPet/>}/>
            <Route path="/pet-info/:id" element={<PetInfo/>}/>
            <Route exact path="/account" element={<Account/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/pet/:id" element={<Pet/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App