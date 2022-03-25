import React from "react"
import Signup from "./Signup"
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from 
'react-router-dom'
import Homepage from "./Homepage"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassowrd from "./ForgotPassword"
import EmailVerification from "./EmailVerification"

function App() {
  return (
    <Container className="d-flex allign-items-center justify-content-center"
    style={{ minHeight: "100vh"}}>

      <div className="w-100" style={{ maxWidth: "400px"}}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute><Homepage /> </PrivateRoute>}></Route>
              <Route exact path="/signup" element={<Signup/>}/>
              <Route exact path="/emailverification" element={<EmailVerification/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/forgot-password" element={<ForgotPassowrd/>}/>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
