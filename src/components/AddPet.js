import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { writePet } from "./API"
import { auth } from '../firebase'
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AddPet(){
    const [setError] = useState("")
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [ setLoading] = useState(false)
    const [image, setImage] = useState(null);

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    async function handleLogout() {
        setError('')
    
        try {
          await logout()
          navigate('/login')
        } catch{
          setError('Logout failed')
        }
      }

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
                    
                    writePet(auth.currentUser.uid, petAge, petType, downloadURL, petBreed, petName);
        
                    document.getElementById("petName").value = "";
                    document.getElementById("petType").value = "";
                    document.getElementById("petBreed").value = "";
                    document.getElementById("petAge").value = "";
                    document.getElementById("petPhoto").value = "";
        
                    toast.success("Pet Added!", {position: toast.POSITION.BOTTOM_CENTER});
        
                    } catch {
                        alert('add pet function didnt work')
                    }
            });
        }
        );
    }


    return (
            <>
                <main class="main">
                <body>
                    <aside class="sidebar">
                        <nav class="nav">
                        <ul>
                            <li><a href="/homepage">Your Pets</a></li>
                            <li class="active"><a href="/add-pet">Add Pet</a></li>
                            <li><a href="/account">Account</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/login"><button onSubmit={handleLogout}>Logout</button></a></li>
                        </ul>
                        </nav>
                    </aside>
                </body>
                </main>
                <body style={{minHeight: "100vh"}} class="nicebackground login-form d-flex allign-items-center justify-content-center">
                    <section>
                        <div class="mycontainer">
                            <div class="row justify-content-md-center">
                                <div class="card-wrapper">
                                    <div class="brand">
                                        <img src="logo.png" alt="logo"/>
                                    </div>
                                    <div class="card fat">
                                        <div class="card-body">
                                            <h4 class="card-title">Add Pet</h4>
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
                                                    <input id="petPhoto"  type="file" class="form-control" name="petPhoto" onChange={handleChange} required data-eye/>
                                                </div>
                                                <div className= "w-100 text-center mt-2"></div>
                                                <div class="form-group">
                                                    <label for="petAge">Type of Pet
                                                    <div className= "w-100 text-center mt-2"></div>
                                                    </label>
                                                    <input id="petType" placeHolder="Type of Pet" type="petType" class="form-control" name="petType" required data-eye/>
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
                                                <div class="form-group m-0">
                                                    <button type="submit" style={{width:"320px", height:"50px"}}onClick={handleAddPet} class="btn btn-primary btn-block">
                                                        <span>Add Pet</span>
                                                    </button>
                                                </div>
                                            </form>
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