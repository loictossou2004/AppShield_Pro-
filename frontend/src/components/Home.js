import React, {  } from 'react'
import '../App.css'
import NavbarComponent from './NavBar'
import HeroSection from './HeroSection'
// import {Navbar, Container, Nav} from 'react-bootstrap';
// import LoginImg from '../assets/Image.png'
// import * as Icon from 'react-bootstrap-icons';

function Home() {

    return (
        <div className=' w-full font-Poppins'>
            <NavbarComponent/>
            <HeroSection/>
        </div>
        
        
        
        
    )
}

export default Home