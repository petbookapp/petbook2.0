import React, { useState } from 'react'
import { writePet } from "./API"
import { auth } from '../firebase'
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AddPet(){
    const [image, setImage] = useState(null);

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

      async function handleAddPet(e) {
        e.preventDefault()

        const storageRef = ref(storage, `users/${auth.currentUser.uid}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                try {
                    const petName = document.getElementById("petName").value
                    const petType = document.getElementById("petType").value
                    const petBreed = document.getElementById("petBreed").value
                    const petAge = document.getElementById("petAge").value
                    const petGender = document.getElementById("petGender").value
                    const petWeight = document.getElementById("petWeight").value
                    
                    writePet(auth.currentUser.uid, petAge, petType, downloadURL, petBreed, petName, petGender, petWeight);
        
                    document.getElementById("petName").value = "";
                    document.getElementById("petType").value = "";
                    document.getElementById("petBreed").value = "";
                    document.getElementById("petAge").value = "";
                    document.getElementById("petPhoto").value = "";
                    document.getElementById("petGender").value = "";
                    document.getElementById("petWeight").value = "";
        
                    toast.success("Pet Added!", {position: toast.POSITION.TOP_RIGHT});
        
                    } catch {
                        alert('add pet function didnt work')
                    }
            });
        }
        );
    }


    return (
            <>
            <div class="card-wrapper">
                <div class="card fat">
                    <div class="card-body">
                        <form class="login-form">
                            <div class="form-group">
                                <label for="petName">Name</label>
                                <div className= "w-100 text-center mt-2"></div>
                                <input id="petName" placeHolder="Name" type="petName" class="form-control" name="petName"  required autofocus/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                                <label for="petAge">Pet Photo
                                <div className= "w-100 text-center mt-2"></div>
                                </label>
                                <input id="petPhoto"  type="file" class="form-control" name="petPhoto" onChange={handleChange}/>
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
                                <input id="petBreed" placeHolder="Breed" type="petBreed" class="form-control" name="petBreed" required data-eye/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                                <label for="petAge">Age
                                <div className= "w-100 text-center mt-2"></div>
                                </label>
                                <input id="petAge" placeHolder="Age" type="petAge" class="form-control" name="petAge" required data-eye/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                                <label for="petGender">Gender
                                <div className= "w-100 text-center mt-2"></div>
                                </label>
                                <input id="petGender" placeHolder="Gender" type="petGender" class="form-control" name="petGender" required data-eye/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group">
                                <label for="petWeight">Weight
                                <div className= "w-100 text-center mt-2"></div>
                                </label>
                                <input id="petWeight" placeHolder="Weight" type="petWeight" class="form-control" name="petWeight" required data-eye/>
                            </div>
                            <div className= "w-100 text-center mt-2"></div>
                            <div class="form-group m-0">
                                <button type="submit" style={{width:"320px", height:"50px"}}onClick={handleAddPet} class="btn btn-primary btn-block">
                                    <span>Add Pet</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
    )
}