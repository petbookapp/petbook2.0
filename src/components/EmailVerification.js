import { Link } from "react-router-dom";
import { Card } from "react-bootstrap"
import { auth } from '../firebase'



export default function EmailVerification() {
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Please verify your email to login</h2>
                    <div className= "w-100 text-center mt-2">
                        A verifictaion email has been sent to {auth.currentUser.email}
                    </div>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                   <div className= "w-100 text-center mt-2">
                        Return to <Link to="/login">login</Link>
                    </div>
                    <div className= "w-100 text-center mt-2">
                        Entered the incorrect email? Return to <Link to="/signup">Sign Up</Link>
                    </div>
                    
                </Card.Body>
            </Card>
            
        </>
        
    )
    
}