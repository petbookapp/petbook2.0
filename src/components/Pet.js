import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, database} from '../firebase'
import { doc, getDoc } from "firebase/firestore";


export default function Pet() {
  const [pet, setPet] = useState("")
  let { id } = useParams()
  
  useEffect(() => {
    getPet(id)
  }, []);

  async function getPet(id) {
    let petData = []
    try {
      const docRef = doc(database, "pets", id);
      const snapshot = await getDoc(docRef)
      
      petData.push({...snapshot.data()})
      setPet(petData)
      
    } catch {
      console.log("No such document!");
    }
  }
  return (
    <>
      <div className="nicebackground">
          <h2 style={{ fontSize: 25 }} className="text-center mb-4">
                <img className="logo center-margin4" src="/logo.png" alt="logo"/>
            </h2>
          {Object.keys(pet).map((key) => (
              <>
                <div class="team-single center-margin3">
                    <div class="row">
                        <div class="col-lg-4 col-md-5 xs-margin-30px-bottom">
                            <div class="team-single-img">
                                <img src={pet[key]["petPhoto"]} alt="MyPet"/>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-7">
                            <div class="team-single-text padding-50px-left sm-no-padding-left">
                                <div class="contact-info-section margin-40px-tb">
                                    <ul class="list-style9 no-margin">

                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-solid fa-file text-orange"></i>
                                                    <strong class="margin-10px-left text-orange">Name:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{pet[key]["petName"]} </p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-purple"></i>
                                                    <strong class="margin-10px-left text-purple">Type:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{pet[key]["petType"]}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-lightred"></i>
                                                    <strong class="margin-10px-left text-lightred">Breed:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{pet[key]["petBreed"]}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-file text-green"></i>
                                                    <strong class="margin-10px-left text-green">Age:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{pet[key]["petAge"]}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>

                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-user text-purple"></i>
                                                    <strong class="margin-10px-left xs-margin-four-left text-purple">Owner:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p>{auth.currentUser.displayName}</p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>
                                            <div class="row">
                                                <div class="col-md-5 col-5">
                                                    <i class="fas fa-envelope text-pink"></i>
                                                    <strong class="margin-10px-left xs-margin-four-left text-pink">Email:</strong>
                                                </div>
                                                <div class="col-md-7 col-7">
                                                    <p><a href="/homepage">{auth.currentUser.email}</a></p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12"></div>
                    </div>
                </div>
                </>
            ))}
      </div>
    </>
  )
}
 