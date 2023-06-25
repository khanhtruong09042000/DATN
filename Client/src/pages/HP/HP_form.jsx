import React, { useState } from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import './form.css'
import {axiosInstance} from "../../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HP_form = () => {

  const [MA_HP, setID] = useState('')
  const [TEN_HP, setName] = useState('')
  const [YEU_CAU_TN, setTN] = useState(true)
  const [VIEN, setVIEN] = useState('Điện tử - viễn thông')
  const [err, setErr] = useState(false)

  const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
        if(!MA_HP || !TEN_HP ){
          toast.error("Không được để trống dữ liệu !", {
            position: "top-center"
        });
        }else{
          const res = await axiosInstance.post('/subjects',{
            MA_HP, TEN_HP, YEU_CAU_TN, VIEN
          })
          console.log("res: " + JSON.stringify(res.data.code))
          if(res.data.code == 'ER_DUP_ENTRY'){
            toast.info("Mã học phần bị trùng !", {
              position: "top-center"
          })
          }else{
          toast.success("Tạo học phần thành công !", {
            position: "top-center"
        });}}
      } catch (error) {
          setErr(true)
          toast.error("Lỗi không tạo được học phần !", {
            position: "top-center"
        });
      }
  }

  return <div className='table_HP'>
      <Navbar/>
      <div className="containerHP">
          <SideBar/>
          <div className="table1">
              <h1>Thêm học phần</h1>
              <form className="wapperHP1" onSubmit={handleSubmit}>
                  <label>Mã học phần:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...' onChange={(e)=>setID(e.target.value)}/>
                  <label>Tên học phần:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setName(e.target.value)}/>
                  <label htmlFor="level">Yêu cầu TN: </label>
                <select name="level" id="" onChange={(e)=>setTN(e.target.value)}>
                  <option value="1">Có</option>
                  <option value="0">Không</option>
              </select>
              <label htmlFor="vien">Viện: </label>
                <select name="vien" id="" onChange={(e)=>setVIEN(e.target.value)}>
                  <option value="Điện tử - viễn thông">Điện tử - viễn thông</option>
                  <option value="Công nghệ - thông tin">Công nghệ - thông tin</option>
              </select>
              <button className='sub' type='submit'>Submit</button>
              </form>
              <ToastContainer />
          </div>
      </div>
      <Footer1/>
  </div>;
};

export default HP_form;
