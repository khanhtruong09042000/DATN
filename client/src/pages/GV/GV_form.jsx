import React, { useState } from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import {axiosInstance} from "../../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GV_form = () => {

    const [ID, setID] = useState('')
  const [HO_TEN, setHT] = useState('')
  const [GIOI_TINH, setGT] = useState('Nam')
  const [NGAY_SINH, setNS] = useState('')
  const [SDT, setSDT] = useState('')
  const [DIA_CHI, setDC] = useState('')
  const [VIEN, setVIEN] = useState('Điện tử - viễn thông')

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      if(!ID || !HO_TEN|| !NGAY_SINH || !SDT ||!DIA_CHI ){
        toast.error("Không được để trống dữ liệu !", {
          position: "top-center"
      });
      }else{
        const res = await axiosInstance.post('/teachers',{
          ID, HO_TEN, GIOI_TINH, NGAY_SINH, SDT, DIA_CHI, VIEN
        })
        console.log("res: " + JSON.stringify(res.data.code))
        if(res.data.code == 'ER_DUP_ENTRY'){
          toast.info("ID bị trùng !", {
            position: "top-center"
        })
        }else{
        toast.success("Tạo thông tin giáo viên thành công !", {
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
              <h1>Thêm giáo viên</h1>
              <form className="wapperHP1"  onSubmit={handleSubmit}>
                  <div className="contai">
                  <div className="con">
                  <label>ID:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setID(e.target.value)}/>
                  <label>Họ và tên:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setHT(e.target.value)}/>
                  <label htmlFor="level">Giới tính: </label>
                <select name="level" id=""onChange={(e)=>setGT(e.target.value)}>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
              </select>
              </div>
              <div className="con">
              <label>Ngày sinh:</label>
                  <input type="date" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setNS(e.target.value)}/>
                  <label>SĐT:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setSDT(e.target.value)}/>
                  <label>Địa chỉ:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setDC(e.target.value)}/>
                  <label htmlFor="vien">Viện: </label>
                <select name="vien" id="" onChange={(e)=>setVIEN(e.target.value)}>
                  <option value="Điện tử - viễn thông">Điện tử - viễn thông</option>
                  <option value="Công nghệ - thông tin">Công nghệ - thông tin</option>
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

export default GV_form;
