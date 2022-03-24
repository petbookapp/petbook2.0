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

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const[loading,setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
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
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}