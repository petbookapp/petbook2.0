import iphoneBanner from "./assets/images/phones/iphone-banner.png";
import iphoneFeature from "./assets/images/phones/iphone-feature.png"
import iphoneScreen from "./assets/images/phones/i-phone-screen.png"
import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import MobileStoreButton from 'react-mobile-store-button';



export default function LandingPage(){
    const navigate = useNavigate();

    async function goToLogin(e) 
    {
        navigate('/login')
    }
    return (
      <>
        <head>
            <meta charset="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Lifetrakr</title>
            <link href="plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
            
            <link rel="stylesheet" href="plugins/themify-icons/themify-icons.css"/>
            
            <link href="plugins/slick/slick.css" rel="stylesheet"/>
            
            <link href="plugins/slick/slick-theme.css" rel="stylesheet"/>

            
            <link href="css/style.css" rel="stylesheet"/>

            <link href="images/favicon.png" rel="shortcut icon"/>

        </head>

            <body class="body-wrapper landing">
                <nav class="navbar main-nav fixed-top navbar-expand-lg large">
                <div class="container">
                    <a class="navbar-brand" href="/homepage"><img style={{height: "75px", width: "150px"}}src="logo.png" alt="logo"/></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="ti-menu text-white"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link scrollTo" href="#home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link scrollTo" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link scrollTo" href="#feature">Features</a>
                    </li>
                    <li class="nav-item">
                        <button class="myLogin" onClick={goToLogin}><span>Login</span></button>
                    </li>
                    </ul>
                    </div>
                </div>
                </nav>

                <section class="banner bg-1" id="home">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 align-self-center">
                            <div class="content-block">
                                <h1>Pet care made simple</h1>
                                <h5>Try it in the app:</h5>
                                <div class="app-badge">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <div>
                                                <MobileStoreButton
                                                    style={{height: "200px" , width: "200px"}}
                                                    store="ios"
                                                    url={"/.login"}
                                                    linkProps={{ title: 'iOS Store Button' }}
                                                />
                                            </div>
                                        </li>
                                        <li class="list-inline-item">
                                            <div>
                                                <MobileStoreButton
                                                    style={{height: "214px" , width: "225px"}}
                                                    store="android"
                                                    url={"/.login"}
                                                    linkProps={{ title: 'Android Store Button' }}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="image-block">
                                <img class="img-fluid phone-thumb" src={iphoneBanner} alt="iphone-banner"/>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

                <section class="about section bg-2" id="about">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 align-self-center text-center">
                            
                            <div class="image-block">
                                <img class="phone-thumb-md" src={iphoneFeature} alt="iphone-feature"/>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-10 m-md-auto align-self-center ml-auto">
                            <div class="about-block">
                                
                                <div class="about-item">
                                    <div class="icon">
                                        <i class="ti-palette"></i>
                                    </div>
                                    <div class="content">
                                        <h5>Creative Design</h5>
                                        <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
                                            and I will give you a complete accounta</p>
                                    </div>
                                </div>
                                
                                <div class="about-item active">
                                    <div class="icon">
                                        <i class="ti-panel"></i>
                                    </div>
                                    <div class="content">
                                        <h5>Easy to Use</h5>
                                        <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
                                            and I will give you a complete accounta</p>
                                    </div>
                                </div>
                                
                                <div class="about-item">
                                    <div class="icon">
                                        <i class="ti-vector"></i>
                                    </div>
                                    <div class="content">
                                        <h5>Best User Experience</h5>
                                        <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
                                            and I will give you a complete accounta</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

            

                <section class="section feature" id="feature">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section-title">
                                <h2>App Features</h2>
                                <p>Demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee idea of
                                    denouncing pleasure and praising</p>
                            </div>
                        </div>
                    </div>
                    <div class="row bg-elipse">
                        <div class="col-lg-4 align-self-center text-center text-lg-right">
                            
                            <div class="feature-item">
                                
                                <div class="icon">
                                    <i class="ti-brush-alt"></i>
                                </div>
                                <div class="content">
                                    <h5>Beautiful Interface Design</h5>
                                    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
                                </div>
                            </div>
                            
                            <div class="feature-item">
                                <div class="icon">
                                    <i class="ti-gift"></i>
                                </div>
            
                                <div class="content">
                                    <h5>Unlimited Features</h5>
                                    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 text-center">
                            
                            <div class="feature-item mb-0">
                                <div class="icon">
                                    <i class="ti-comments"></i>
                                </div>
            
                                <div class="content">
                                    <h5>Full free chat</h5>
                                    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
                                </div>
                            </div>
                            <div class="app-screen">
                                <img class="img-fluid" src={iphoneScreen} alt="app-screen"/>
                            </div>
                            
                            <div class="feature-item">
                                <div class="icon">
                                    <i class="ti-support"></i>
                                </div>
            
                                <div class="content">
                                    <h5>24/7 support by real people</h5>
                                    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 text-center text-lg-left align-self-center">
                            
                            <div class="feature-item">
            
                                <div class="icon">
                                    <i class="ti-image"></i>
                                </div>
                        
                                <div class="content">
                                    <h5>Retina ready greaphics</h5>
                                    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
                                </div>
                            </div>
                            
                            <div class="feature-item">
                                <div class="icon">
                                    <i class="ti-pie-chart"></i>
                                </div>
            
                                <div class="content">
                                    <h5>IOS and android version </h5>
                                    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

                <footer class="footer-main">
                <div class="container">
                <div class="row">
                    <div class="col-lg-6 mr-auto">
                    <div class="footer-logo">
                        <img style={{height: "75px", width: "150px"}} src="logo.png" alt="footer-logo"/>
                    </div>
                    <div class="copyright">
                        <p>@2022 PetBook Team All Rights Reserved | Design and Developed By : Group23</p>
                    </div>
                    </div>
                    <div class="col-lg-6 text-lg-right">
                    <ul class="footer-links list-inline">
                        <li class="list-inline-item">
                        <a class="scrollTo" href="#home">Home</a>
                        </li>
                        <li class="list-inline-item">
                        <a class="scrollTo" href="#about">About</a>
                        </li>
                        <li class="list-inline-item">
                        <a class="scrollTo" href="#feature">Features</a>
                        </li>
                        <li class="list-inline-item">
                        <a class="scrollTo" href="/login">Login</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
                </footer>


                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBI14J_PNWVd-m0gnUBkjmhoQyNyd7nllA" async defer></script>

                <script src="plugins/jquery/jquery.js"></script>
                <script src="plugins/bootstrap/bootstrap.min.js"></script>
                <script src="plugins/slick/slick.min.js"></script>
                <script src="js/custom.js"></script>

            </body>
      </>
    )
}