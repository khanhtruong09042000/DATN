import React from 'react';
import logo from '../../Images/logo.png'
import { AiFillPhone, AiFillMail, AiFillBank, AiFillFacebook, AiFillYoutube, AiFillLinkedin, AiFillSkype } from "react-icons/ai"
import './footer.css'

const Footer = () => {
  return <div className='footer'>
      <div className="left1">
        <div className="containerFooter">
        <img src={logo} className='img2'/>
          <div className="text2">K&T.A</div>
        </div>
      </div>
      <div className="right1">
        <div className="text3">
            Contact
        </div>
        <div className="wapper">
            <div className="iconContainer">
                <div className="icon">
                    <AiFillPhone/>
                    <div className="desc1">123456</div>
                </div>
                <div className="icon">
                    <AiFillMail/>
                    <div className="desc1">abc@gmail.com</div>
                </div>
                <div className="icon">
                    <AiFillBank/>
                    <div className="desc1">123456</div>
                </div>
                </div>
                <div className="iconContainer">
                <div className="icon">
                    <AiFillFacebook/>
                    <div className="desc1">Facebook</div>
                </div>
                <div className="icon">
                    <AiFillLinkedin/>
                    <div className="desc1">LinkedIn</div>
                </div>
                <div className="icon">
                    <AiFillYoutube/>
                    <div className="desc1">Youtube</div>
                </div>
            </div>
            <div className="iconContainer">
                <div className="icon">
                    <AiFillSkype/>
                    <div className="desc1">Skype</div>
                </div>
                </div>
      </div>
      </div>
  </div>;
};

export default Footer;
