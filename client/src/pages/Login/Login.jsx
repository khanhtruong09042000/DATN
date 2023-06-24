import React from 'react';
import './login.css'
import {axiosInstance} from "../../config"
import { useContext, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import {Navigate} from 'react-router-dom';

import {
  login,
  selectLoading,
  selectErrorMessage,
  selectUser,
} from '../../Redux/userSlice';

const Login = () => {
const [username, setUser] = useState('');
const [password, setPassword] = useState('');
const [level, setLevel] = useState('Giáo vụ');
const status = 'Online'

const dispatch = useDispatch();

// Select data from store
const isLoading = useSelector(selectLoading);
const errorMessage = useSelector(selectErrorMessage);
const user = useSelector(selectUser);

const handleLogin = async (e) => {
    e.preventDefault()
        dispatch(login({ username, password,level }));
    try {
        const res = await axiosInstance.put('/user/id/status',{
            username, status
            })
            console.log(res.data);
    } catch (error) {
        console.log(error)
    }
};

// Navigate to dashboard page if login successful
if(user){
if (user.level == 'Giáo vụ') {
    return <Navigate to="/danhsachUser" replace={true}/>
} else if(user.level == 'Giáo viên'){
    return <Navigate to="/dangkihinhthucthi" replace={true}/>
}else{
    return <Navigate to="/xemlichthi" replace={true}/>
}
}

  return <div className='login1'>
      <div className="containerLogin">
          <div className="title">
              Login
          </div>
          <form >
              <div className="inputContainer">
                  <div className="title1">
                      Username:
                  </div>
              <input type="text" placeholder='Nhập dữ liệu vào đây...' onChange={(event) => setUser(event.target.value)}/>
              </div>
              <div className="inputContainer">
                  <div className="title1">
                      Password:
                  </div>
                  <input type="password" placeholder='Nhập dữ liệu vào đây...' onChange={(event) => setPassword(event.target.value)}/>
              </div>
              <div className="containerLabel">
              <label htmlFor="level">Bạn là: </label>
              <select name="level" id="" onChange={(event) => setLevel(event.target.value)}>
                  <option value="Giáo vụ">Giáo vụ</option>
                  <option value="Giáo viên">Giáo viên</option>
                  <option value="Sinh viên">Sinh viên</option>
              </select>
              </div>
              <button className='buttonLogin' onClick={handleLogin}  disabled={isLoading}>Đăng nhập</button>
          </form>
           <ToastContainer />
      </div>
  </div>;
};

export default Login;
