import React from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import Table_LT from '../../components/Tables/Table_LT';
import Table_LT_Search from '../../components/Tables/Table_LT_Search';
import {axiosInstance} from "../../config"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LT_table = () => {

    const [ID, setID] = useState('')
    const [LT, setLT] = useState([])
    const [open, setOpen] = useState(true)
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          if( !ID  ){
            setOpen(true)
          }else{
            const res = await axiosInstance.post('/schedules_id',{
               ID
            })
            console.log("res: " + JSON.stringify(res.data))
            setLT(res.data)
            setOpen(false)
            if(res.data.length == 0){
              toast.error("Nhập ID lịch thi không đúng !", {
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
              <h1>Danh sách lịch thi</h1>
              <form className="wapperHP"  onSubmit={handleSubmit}>
                  <h3>Tìm kiếm theo ID lịch thi:</h3>
                  <div className="tim">
                      <input type="search" className='HP' onChange={(e)=>setID(e.target.value)}placeholder='Nhập dữ liệu vào đây'/>
                      <button className='button_HP'>Search</button>
                  </div>
              </form>
              {
                open ? (
              <Table_LT/>
                ):(
              <Table_LT_Search data= {LT}/>
                )
}
              <ToastContainer />
          </div>
      </div>
      <Footer1/>
  </div>;
};

export default LT_table;
