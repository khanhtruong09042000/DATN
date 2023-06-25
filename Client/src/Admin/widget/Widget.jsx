import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import {axiosInstance} from "../../config"
import * as React from 'react';
import { useState } from 'react';
import Popup_SV from '../popup/Popup_SV';
import Popup_GV from '../popup/Popup_GV';
import Popup_GV1 from '../popup/Popup_GV1';
import { toast, ToastContainer } from "react-toastify";

const Widget = ({ type }) => {
  let data;
  const [users, setUsers] = useState([])
  const [GV, setGV] = useState([])
  const [GV1, setGV1] = useState([])
  const [SV, setSV] = useState([])
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
   const [open3, setOpen3] = useState(false)

  //temporary
  const amount = 100;
  const diff = 20;

  const handleOpen = async (id)=>{
    if(id == 'Danh sách sinh viên'){
      setOpen1(true)
    }else if(id == 'Danh sách giáo vu'){
      setOpen2(true)
    }else if(id == 'Danh sách giáo viên'){
      setOpen3(true)
    }else{
      toast.info("Danh sách Users phía bên dưới", {
        position: "top-right"
    });
    }
  }

  React.useEffect(()=>{
    const fetchU = async ()=>{
      const res = await axiosInstance.get('/user/find')
      setUsers(res.data)
    }
    fetchU()
  },[])

  React.useEffect(()=>{
    const fetchGV = async ()=>{
      const res = await axiosInstance.get('/user/finds/GV')
      setGV(res.data)
    }
    fetchGV()
  },[])

  React.useEffect(()=>{
    const fetchU = async ()=>{
      const res = await axiosInstance.get('/user/finds/GV1')
      setGV1(res.data)
    }
    fetchU()
  },[])

  React.useEffect(()=>{
    const fetchU = async ()=>{
      const res = await axiosInstance.get('/user/finds/SV')
      setSV(res.data)
    }
    fetchU()
  },[])

  console.log("data:" +users.length)

  switch (type) {
    case "GV":
      data = {
        title: "Giáo vụ",
        isMoney: false,
        link: "Danh sách giáo vu",
        amount: GV.length,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        style: 'rgba(255, 0, 0, 0.2)',
      };
      break;
    case "GV1":
      data = {
        title: "Giáo viên",
        isMoney: false,
        link: "Danh sách giáo viên",
        amount: GV1.length,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        style: 'rgba(218, 165, 32, 0.2)',
      };
      break;
    case "SV":
      data = {
        title: "Sinh viên",
        isMoney: false,
        link: "Danh sách sinh viên",
        amount: SV.length,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        style: 'rgba(0, 128, 0, 0.2)',
      };
      break;
    case "balance":
      data = {
        title: "Tổng số User",
        isMoney: false,
        link: "Danh sách User",
        amount: users.length,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        style: 'rgba(128, 0, 128, 0.2)',
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget" style={{backgroundColor: data.style}}>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link" onClick = {()=>handleOpen(data.link)}>{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} Users
        </div>
        {data.icon}
      </div>
      <Popup_SV data = {open1} is={setOpen1}/>
      <Popup_GV data = {open2} is={setOpen2}/>
      <Popup_GV1 data = {open3} is={setOpen3}/>
      <ToastContainer/>
    </div>
  );
};

export default Widget;