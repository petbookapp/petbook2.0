import { collection, addDoc, doc, getDoc, getDocs, setDoc, updateDoc, query, where} from "firebase/firestore"; 
import { database, auth} from '../firebase';

export function writePet(userId, pAge, pType, pPhoto, pBreed, pName, pGender, pWeight) {
    try {
      const docRef = addDoc(collection(database, "pets"), {
        petAge: pAge,
        petName: pName,
        petPhoto: pPhoto,
        petWeight: pWeight,
        petGender: pGender,
        petType: pType,
        petBreed: pBreed,
        userAssociation: doc(database, "users", auth.currentUser.uid),
      }); 

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export function writeUserData(user, name, email, phoneNumber) {
    try {
        const docRef = setDoc(doc(collection(database, "users"), user.uid), {
          bio: "",
          created_time: user.metadata.creationTime,          
          display_name: name,
          email: email,
          phone_number: phoneNumber,
          photo_url: "",
          uid: user.uid,
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

export function getPets(userId) {
  try {
      const q = query(collection(database, "pets"), where("userAssociation", "==", database.DocumentReference('/users/' + userId)));
      const querySnapshot = getDocs(q);
      console.log(querySnapshot);
      return querySnapshot;
    } catch (e) {
      console.error("Error deletign document: ", e);
    }
}
