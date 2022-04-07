import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where} from "firebase/firestore"; 
import { auth, database} from '../firebase';

export function writePet(userId, pAge, pType, pBreed, pName) {
    try {
        const docRef = setDoc(doc(collection(database, "pets"), userId), {
            name: pName,
            age: pAge,
            type: pType,
            breed: pBreed
            
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export function writeUserData(userId, name, email) {
    try {
        const docRef = setDoc(doc(collection(database, "users"), userId), {
            name: "",
            email: email,
            ID: userId,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export function updateUser(userId, name, email)
{
    if (email !== '')
    {
        if (name !== '')
        {
            updateDoc(doc(collection(database, "users"), userId), {
                email: email,
                name: name
              });
        }
        else
        {
            updateDoc(doc(collection(database, "users"), userId), {
                email: email,
              });
        }
    }
    else
    {
        updateDoc(doc(collection(database, "users"), userId), {
            name: name
          });
    }
}

export function deletePet(userId, pName) {
    try {
        const q = query(doc(collection(database, "users"), userId), where("Pet name", "==", pName));
        const querySnapshot = getDoc(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
          });

      } catch (e) {
        console.error("Error deletign document: ", e);
      }
}