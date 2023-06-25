import React from 'react';
import Footer1 from '../components/Footer1/Footer1';
import Navbar from '../components/Navbar/Navbar';
import SideBar_SV from '../components/Sidebars/SideBar_SV';
import LT_Table from './LT_Table';
import Table_LT_Search from './LT_Table_Search';
import {axiosInstance} from "../config"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import Table_LT_Search from '../components/Tables/Table_LT_Search';

const LT = () => {

const [MSSV, setMLT] = useState('')
    const [LT1, setLT] = useState([])
    const [open, setOpen] = useState(true)
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          if( !MSSV  ){
            setOpen(true)
          }else{
            const res = await axiosInstance.post('/schedules_mssv',{
              MSSV
            })
            console.log("res: " + JSON.stringify(res.data))
            setLT(res.data)
            setOpen(false)
            if(res.data.length == 0){
              toast.error("Nhập MSSV không đúng !", {
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
      <SideBar_SV/>
      <div className="table1">
          <h1>Xem danh sách lịch thi</h1>
          <form className="wapperHP" onSubmit={handleSubmit}>
                  <h3>Tìm kiếm theo MSSV:</h3>
                  <div className="tim">
                      <input type="search" className='HP' placeholder='Nhập dữ liệu vào đây' onChange={(e)=>setMLT(e.target.value)}/>
                      <button className='button_HP'>Search</button>
                  </div>
              </form>
              {
                open ? (
              <LT_Table/>
                ):(
              <Table_LT_Search data= {LT1}/>
                )
}
<ToastContainer />
      </div>
  </div>
  <Footer1/>
</div>;
};

export default LT;
