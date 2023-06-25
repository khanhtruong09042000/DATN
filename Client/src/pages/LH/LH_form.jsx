import React from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import {axiosInstance} from "../../config"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LH_form = () => {

  const [SV, setSV] = useState([])
  const [GV, setGV] = useState([])
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
    const fetchGV = async ()=>{
      const res = await axiosInstance.get('/teacher_id')
      setGV(res.data)
      console.log("data:" +res.data)
    }
    fetchGV()
  },[])

  React.useEffect(()=>{
    const fetchHP = async ()=>{
      const res = await axiosInstance.get('/subject_id')
      setHP(res.data)
      console.log("data:" +res.data)
    }
    fetchHP()
  },[])

  const [MA_LOP_THI, setMA] = useState('')
  const [TEN_LOP_THI, setTEN] = useState('')
  // const [MSSV, setMSSV] = useState('')
  const [ID, setTD] = useState('')
  const [MA_HP, setMAHP] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      if(!MA_LOP_THI || !TEN_LOP_THI || !ID ||!MA_HP ){
        toast.error("Không được để trống dữ liệu !", {
          position: "top-center"
      });
      }else{
        const res = await axiosInstance.post('/classes',{
          MA_LOP_THI, TEN_LOP_THI, ID, MA_HP
        })
        console.log("res: " + JSON.stringify(res.data.code))
        if(res.data.code == 'ER_DUP_ENTRY'){
          toast.info("Mã lớp thi bị trùng !", {
            position: "top-center"
        })
        }else{
        toast.success("Tạo thông tin lớp thi thành công !", {
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
              <h1>Thêm lớp thi</h1>
              <form className="wapperHP1"  onSubmit={handleSubmit}>
                  <div className="contai">
                  <div className="con">
                  <label>Mã lớp thi:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setMA(e.target.value)}/>
                  <label>Tên lớp thi:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setTEN(e.target.value)}/>
                  {/* <label htmlFor="level">MSSV: </label> */}
                {/* <select name="level" id=""onChange={(e)=>setMSSV(e.target.value)}>
                <option value=""></option>
                {SV.map((s)=>(
                <option value={s.MSSV}>{s.MSSV} - {s.HO_TEN}</option>
                ))}
              </select> */}
              </div>
              <div className="con">
              {/* <label>Tên học phần:</label> */}
              {/* {TEN_HP1.map((e)=>(
                  <input type="text" readOnly value={e.TEN_HP} />
                  ))} */}
                   {/* <input type="text" placeholder='Nhập dữ liệu vào đây...'/> */}
                  <label htmlFor="level">ID giáo viên: </label>
                <select name="level" id=""onChange={(e)=>setTD(e.target.value)}>
                  <option value=""></option>
                  {GV.map((s)=>(
                <option value={s.ID}>{s.ID} - {s.HO_TEN}</option>
                ))}
              </select>
              <label htmlFor="level">Mã học phần: </label>
                <select name="level" id=""onChange={(e)=>setMAHP(e.target.value)}>
                <option value=""></option>
                  {HP.map((s)=>(
                <option value={s.MA_HP}>{s.MA_HP} - {s.TEN_HP}</option>
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

export default LH_form;
