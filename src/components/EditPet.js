import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from '../firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPet(){
    const [pet, setPet] = useState("")
    let { id } = useParams()
    
    useEffect(() => {
        getPet(id)
    }, [id]);

    async function getPet(id) {
        let petData = []
        try {
        const docRef = doc(database, "pets", id);
        const snapshot = await getDoc(docRef)
        
        petData.push({...snapshot.data()})
        setPet(petData)
        
        console.log(petData[0]["petName"])
        
        document.getElementById("petName").value = petData[0]["petName"]
        document.getElementById("petType").value = petData[0]["petType"]
        document.getElementById("petBreed").value = petData[0]["petBreed"]
        document.getElementById("petAge").value = petData[0]["petAge"]
        document.getElementById("petGender").value = petData[0]["petGender"]
        document.getElementById("petWeight").value = petData[0]["petWeight"]
        
        } catch {
        console.log("Pet Not Found");
        }
    }

    async function handleUpdatePet(e) {
        e.preventDefault()

        try {
            const docRef = doc(database, "pets", id);
            
            updateDoc(docRef, {
                petAge: document.getElementById("petAge").value,
                petName: document.getElementById("petName").value,
                petType: document.getElementById("petType").value,
                petBreed: document.getElementById("petBreed").value,
                petGender: document.getElementById("petGender").value,
                petWeight: document.getElementById("petWeight").value
            })


            } catch (e) {
              console.error("Error adding document: ", e);
            }

        toast.success("Pet Info Updated!", {position: toast.POSITION.TOP_RIGHT});
    }


    return (
        <>
        {Object.keys(pet).map((key) => (
            <>
            <div class="card-wrapper">
                <div class="card fat">
                    <div class="card-body">
                        <form class="login-form">
                            <div class="form-group">
                                <label for="petName">Name</label>
                                <div className= "w-100 text-center mt-2"></div>
                                <input id="petName" type="petName" class="form-control" name="petName" required autofocus/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                            <label for="petType" required data-eye>Choose a pet:</label>
                                    <select name="petType" id="petType">
                                    <option value="">--Please choose an option--</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    </select>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                                <label for="petBreed">Breed
                                <div className= "w-100 text-center mt-2"></div>
                                </label>
                                <input id="petBreed"  type="petBreed" class="form-control" name="petBreed" required data-eye/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                                <label for="petAge">Age
                                <div className= "w-100 text-center mt-2"></div>
                                </label>
                                <input id="petAge" type="petAge" class="form-control" name="petAge" required data-eye/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                                <label for="petGender">Gender
                                <div className= "w-100 text-center mt-2"></div>
                                </label>
                                <input id="petGender" type="petGender" class="form-control" name="petGender" required data-eye/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                                <label for="petWeight">Weight
                                <div className= "w-100 text-center mt-2"></div>
                                </label>
                                <input id="petWeight" type="petWeigth" class="form-control" name="petWeight" required data-eye/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group m-0">
                                <button type="submit" style={{width:"320px", height:"50px"}}onClick={handleUpdatePet} class="btn btn-primary btn-block">
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
            ))}
        </>
    )
}