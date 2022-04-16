import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var errorMessage = "";
export {errorMessage};

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const[loading,setLoading] = useState(true)

    async function signup(email, password) {
        let userCredential
        try {
            userCredential = await auth.createUserWithEmailAndPassword(email, password)
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                     errorMessage = `${email} is already in use`
                     break
                case 'auth/invalid-email':
                     errorMessage = `${email} is invalid`
                     break
                case 'auth/operation-not-allowed':
                     errorMessage = `Sign Up Failed`
                     break
                case 'auth/weak-password':
                     errorMessage = '1'
                     break
                default:
                     errorMessage = error.message
            }
        }
        userCredential.user.sendEmailVerification()
    }

    async function login(email, password) {
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = `The Email ${email} is invalid`
                    break
                case 'auth/user-disabled':
                    errorMessage = `The ${this.state.email} is disabled`
                    break
                case 'auth/user-not-found':
                    errorMessage = `The email address you entered is not found`
                    break
                case 'auth/wrong-password':
                    errorMessage = '1'
                    break
                default:
                    errorMessage = error.message
            }
            return;
        }
        errorMessage = "";
    }
   
    function logout() {
        return auth.currentUser.signOut()
    }

    async function resetPassword(email) {
        try {
            auth.sendPasswordResetEmail(email)
            toast.success("Password Reset Sent", {position: toast.POSITION.TOP_CENTER});
        } catch (e) {
            toast.error("Email Not Found", {position: toast.POSITION.TOP_CENTER});
        } 
    }



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                {!loading && children}
                <ToastContainer />
            </AuthContext.Provider>          
        </>
    )
}