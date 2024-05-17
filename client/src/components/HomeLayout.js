// Register.js
import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import '@coreui/coreui/dist/css/coreui.min.css';
import { CButton, COffcanvas, COffcanvasHeader, COffcanvasTitle, CCloseButton, COffcanvasBody } from '@coreui/react';
import './HomeLayout.css';
import { CiMenuBurger } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Image1 from './assets/porsche1.jpg';
import Image2 from './assets/porsche2.avif';
import Image3 from './assets/porsche3.avif';
const HomeLayout = () => {
    const [visible, setVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        Image1,
        Image2,
        Image3
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const toggleOffcanvas = () => {
        setVisible(!visible);
    };
    return (
        <>
            <div className='home-layout'>
                <div className="title">Porsche</div>
                <img src="https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg" className='porsche-logo' />
                <CButton className="menu-button" onClick={toggleOffcanvas}>
                    <CiMenuBurger size={24} />
                </CButton>
                <COffcanvas placement="start" visible={visible} onHide={toggleOffcanvas}>
                    <COffcanvasHeader>
                        <COffcanvasTitle>Menu</COffcanvasTitle>
                        <CCloseButton className="text-reset" onClick={toggleOffcanvas} />
                    </COffcanvasHeader>
                    <COffcanvasBody>
                        <div className='MenuContainer'>
                            <div className='MenuItems'>
                                <Link to='/login' className='HomeLink'>
                                    <button className='MenuButtons' type="submit">Login</button>
                                </Link>
                                <Link to='/register' className='HomeLink'>
                                    <button className='MenuButtons' type="submit">Register</button>
                                </Link>
                            </div>
                        </div>
                    </COffcanvasBody>
                </COffcanvas>
            </div>
            <div className="slideshow">
                {images.map((image, index) => (
                    <img key={index} src={image} className={`slide ${index === currentSlide ? 'active' : ''}`} alt={`Slide ${index}`} />
                ))}
            </div>
        </>
    );
};

export default HomeLayout;