// import React, { useContext, useState, useEffect } from 'react'
// import { auth } from '../firebase'

// const AuthContext = React.createContext()

// export function useAuth() {
//     return useContext(AuthContext)
// }

// export function AuthProvider({ children }) {
//     const [currentUser, setCurrentUser] = useState()
//     const[loading,setLoading] = useState(true)
//     const database = auth.database;
//     const Push = (userId, email, name) => {
//         // database.ref("User UID").set(userId).ref({
//         // 'User Info' : {
//         //     Email : email,
//         //     Name : name
//         // },
//         alert(userId + email+name);
//         // 'Pets' : '',
//         // }).catch(alert);
//         // database.ref("User UID")
//         // .ref({
//         //     'User Info' : {
//         //         Email : email,
//         //         Name : name
//         //     },
//         //     'Pets' : '',
//         //     }).catch(alert);
//       }

//     // function signup(email, password) {
//     //     // Push(email, 'bob')
//     //     var userId = '';
//     //     // auth.createUserWithEmailAndPassword(email, password).then(
//     //     //     function(user)
//     //     //     {
//     //     //         userId = user.uid;
//     //     //     }
//     //     // )
//     //     auth.createUserWithEmailAndPassword(email, password)
//     //     Push(userId, email, 'bob');
//     //     return
//     // }

// function signup(email, password) {
//     auth.createUserWithEmailAndPassword(email, password).then(Push("test", "emailtest", "bob"))    
//     return
// }

//     function login(email, password) {
//         return auth.signInWithEmailAndPassword(email, password)
//     }
    
//     function logout() {
//         return auth.signOut()
//     }

//     function resetPassword(email) {
//         return auth.sendPasswordResetEmail(email)
//     }

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(user => {
//             setCurrentUser(user)
//             setLoading(false)
//         })
//         return unsubscribe
//     }, [])
    

//     const value = {
//         currentUser,
//         login,
//         signup,
//         logout,
//         resetPassword
//     }

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     )
// }










import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { Alert } from "react-bootstrap"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const[loading,setLoading] = useState(true)
    const [error, setError] = useState('')

    async function signup(email, password) {
        let userCredential
        try {
            userCredential = await auth.createUserWithEmailAndPassword(email, password)
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                     setError(`The Email ${email} already in use.`)
                     break
                case 'auth/invalid-email':
                     setError(`The Email ${email} is invalid.`)
                     break
                case 'auth/operation-not-allowed':
                     setError(`Sign Up Failed.`)
                     break
                case 'auth/weak-password':
                     setError('Password Must be at least 6 characters long')
                     break
                default:
                     setError(error.message)
            }
        }
        userCredential.user.sendEmailVerification()
        setError("")
    }

    async function login(email, password) {
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError(`The Email ${email} is invalid.`)
                    break
                case 'auth/user-disabled':
                    setError(`The ${this.state.email} is disabled.`)
                    break
                case 'auth/user-not-found':
                    setError(`Email Entered Not Found`)
                    break
                case 'auth/wrong-password':
                    setError('Incorrect Password.')
                    break
                default:
                    setError(error.message)
            }
            return;
        }
        setError("")
    }
   
    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
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
            </AuthContext.Provider>          
            {error && <Alert varient="danger">{error}</Alert>}
        </>
    )
}