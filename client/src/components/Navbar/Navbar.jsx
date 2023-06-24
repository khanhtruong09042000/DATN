import React, { useState } from 'react';
import './navbar.css'
import logo from '../../Images/logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { logOut, selectUser } from '../../Redux/userSlice';
import {Navigate} from 'react-router-dom';
import LT_Popup from '../Popup/Popup_User';
import {axiosInstance} from "../../config"

const Navbar = () => {
    const user = useSelector(selectUser);
    const [open, setOpen] = useState(false)
    var username 
    if(user != null){
     username = user.username
    }
    const status = 'Offline'

    const dispatch = useDispatch();
  
    const handleLogout = async () => {
      dispatch(logOut());
      try {
        const res = await axiosInstance.put('/user/id/status',{
            username, status
            })
            console.log(res.data);
    } catch (error) {
        console.log(error)
    }
    };

    if (!user) {
      return <Navigate to="/" replace={true}/>
  }

  const handleOpen = () =>
    {
      setOpen(true);
    }

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
        <img src=
        {
          user.Img
          ? user.Img
          : "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM="
      }
        alt="" className='anh' onClick = {()=>handleOpen()} />
          <div className="login" onClick={handleLogout}>
              LOGOUT
          </div>
      </div>
      <LT_Popup data = {open} is={setOpen}/>
  </div>;
};

export default Navbar;
