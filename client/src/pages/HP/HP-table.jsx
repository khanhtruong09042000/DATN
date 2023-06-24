import React, { useState } from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import Table_HP from '../../components/Tables/Table_HP';
import Table_HP_Search from '../../components/Tables/Table_HP_Search';
import './table_HP.css'
import {axiosInstance} from "../../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HP_table = () => {

    const [MA_HP, setMA] = useState('')
    const [HP, setHP] = useState([])
    const [open, setOpen] = useState(true)
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          if( !MA_HP  ){
            setOpen(true)
          }else{
            const res = await axiosInstance.post('/subject_id',{
               MA_HP
            })
            console.log("res: " + JSON.stringify(res.data))
            setHP(res.data)
            setOpen(false)
            if(res.data.length == 0){
              toast.error("Nhập mã học phần không đúng !", {
                  position: "top-center"
              }); 
          }
           ;}
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
          <div className="table">
              <h1>Danh sách học phần</h1>
              <form className="wapperHP"onSubmit={handleSubmit}>
                  <h3>Tìm kiếm theo mã học phần:</h3>
                  <div className="tim">
                      <input type="search" className='HP' onChange={(e)=>setMA(e.target.value)}placeholder='Nhập dữ liệu vào đây'/>
                      <button className='button_HP'>Search</button>
                  </div>
              </form>
              {
                open ? (
              <Table_HP/>
                ):(
              <Table_HP_Search data= {HP}/>
                )
}
              <ToastContainer />
          </div>
      </div>
      <Footer1/>
  </div>;
};

export default HP_table;
