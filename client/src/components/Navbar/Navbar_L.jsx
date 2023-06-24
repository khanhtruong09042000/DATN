import React from 'react';
import './navbar.css'
import logo from '../../Images/logo.png'
import { Link } from "react-router-dom"

const Navbar_L = () => {

  return <div className='navbar'>
      <div className="left">
          <img src={logo} className='img'/>
          <div className="text1">K&T.A</div>
      </div>
      <div className="center">
          <div className="cir"></div>
          <div className="cir"></div>
          <div className="cir"></div>
          <div className="cir"></div> 
          <div className="text">
          The Best Education
          </div>
          <div className="cir"></div>
          <div className="cir"></div>
          <div className="cir"></div>
          <div className="cir"></div>
      </div>
      <div className="right">
      <Link to="/login" className="link">
          <div className="login">
              LOGIN
          </div>
          </Link>
      </div>
  </div>;
};

export default Navbar_L;
