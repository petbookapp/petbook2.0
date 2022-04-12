import { Link } from "react-router-dom";
import { Card } from "react-bootstrap"
import { auth } from '../firebase'



export default function EmailVerification() {
    
    return (
        <>
            <body style={{minHeight: "100vh"}} class="login-form background d-flex allign-items-center justify-content-center"> 
                <section> 
                <div class="mycontainer">
                        <div class="row justify-content-md-center">
                            <div class="card-wrapper">
                                <div class="brand">
                                    <img src="logo.png" alt="logo"/>
                                </div>
                                <div class="card fat">
                                    <div class="card-body">
                                    <h2 className = "text-center mb-4">Please verify your email to login</h2>
                                    <div className= "w-100 text-center mt-2">
                                     A verifictaion email has been sent to {auth.currentUser.email}
                                    </div>
                                     <div class="card-body">
                                     <div className= "w-100 text-center mt-2">
                                    Return to <Link to="/login">login</Link>
                                    </div>
                                    <div className= "w-100 text-center mt-2">
                                    Entered the incorrect email? Return to <Link to="/signup">Sign Up</Link>
                                    </div>
                                    </div>
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