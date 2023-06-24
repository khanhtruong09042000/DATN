import React from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import {axiosInstance} from "../../config"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LT_form = () => {

  const [SV, setSV] = useState([])
  const [LH, setLH] = useState([])
  const [HP, setHP] = useState([])
 
  React.useEffect(()=>{
    const fetchSV = async ()=>{
      const res = await axiosInstance.get('/student_mssv')
      setSV(res.data)
      console.log("data:" +res.data)
    }
    fetchSV()
  },[])

  React.useEffect(()=>{
    const fetchLH = async ()=>{
      const res = await axiosInstance.get('/class_id')
      setLH(res.data)
      console.log("data:" +res.data)
    }
    fetchLH()
  },[])

  React.useEffect(()=>{
    const fetchHP = async ()=>{
      const res = await axiosInstance.get('/subject_id')
      setHP(res.data)
      console.log("data:" +res.data)
    }
    fetchHP()
  },[])

  const [NGAY_THI, setNT] = useState('')
  const [KY_HOC, setKH] = useState('')
  const [MA_LOP_THI, setMLT] = useState('')
  const [MA_HP, setMAHP] = useState('')
  const [ID, setID] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      if(!NGAY_THI || !KY_HOC || !MA_LOP_THI ||!MA_HP || !ID){
        toast.error("Không được để trống dữ liệu !", {
          position: "top-center"
      });
      }else{
        const res = await axiosInstance.post('/schedules',{
          MA_LOP_THI, NGAY_THI, MA_LOP_THI, MA_HP,KY_HOC,ID
        })
        console.log("res: " + JSON.stringify(res.data.code))
        if(res.data.code == 'ER_DUP_ENTRY'){
          toast.info("Mã lịch thi bị trùng !", {
            position: "top-center"
        })
        }else{
        toast.success("Tạo thông tin lịch thi thành công !", {
          position: "top-center"
      });}}
    } catch (error) {
        toast.error("Lỗi không tạo được thông tin !", {
          position: "top-center"
      });
    }
}

  return <div className='table_HP'>
      <Navbar/>
      <div className="containerHP">
          <SideBar/>
          <div className="table1">
              <h1>Sắp xếp lịch thi</h1>
              <form className="wapperHP1" onSubmit={handleSubmit}>
                  <div className="contai">
                  <div className="con">
                  <label>ID:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setID(e.target.value)}/>
                  {/* <label>Tên lớp thi:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'/>
                  <label>Tên học phần:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'/> */}
                  <label>Ngày thi:</label>
                  <input type="date" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setNT(e.target.value)}/>
                  <label htmlFor="level">Mã học phần: </label>
                <select name="level" id=""onChange={(e)=>setMAHP(e.target.value)}>
                <option value=""></option>
                  {HP.map((s)=>(
                <option value={s.MA_HP}>{s.MA_HP} - {s.TEN_HP}</option>
                ))}
              </select>
              </div>
              <div className="con">
              {/* <label>Ngày thi:</label>
                  <input type="date" placeholder='Nhập dữ liệu vào đây...'/> */}
                  <label>Học kì:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setKH(e.target.value)}/>
                  {/* <label htmlFor="level">MSSV: </label>
                <select name="level" id=""onChange={(e)=>setMSSV(e.target.value)}>
                <option value=""></option>
                {SV.map((s)=>(
                <option value={s.MSSV}>{s.MSSV} - {s.HO_TEN}</option>
                ))}
              </select> */}
              <label htmlFor="level">Mã lớp thi: </label>
                <select name="level" id=""onChange={(e)=>setMLT(e.target.value)}>
                <option value=""></option>
                {LH.map((s)=>(
                <option value={s.MA_LOP_THI}>{s.MA_LOP_THI} - {s.TEN_LOP_THI}</option>
                ))}
              </select>
              </div>
              </div>
              <button className='sub' type='submit'>Submit</button>
              </form>
              <ToastContainer />
          </div>
      </div>
      <Footer1/>
  </div>;
};

export default LT_form;
