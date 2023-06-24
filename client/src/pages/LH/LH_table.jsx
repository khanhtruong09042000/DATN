import React from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import Table_LH from '../../components/Tables/Table_LH';
import Table_LH_Search from '../../components/Tables/Table_LH_Search';
import {axiosInstance} from "../../config"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LH_table = () => {

    const [MA_LOP_THI, setMA] = useState('')
    const [LH, setLH] = useState([])
    const [open, setOpen] = useState(true)
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          if( !MA_LOP_THI  ){
            setOpen(true)
          }else{
            const res = await axiosInstance.post('/class_id',{
               MA_LOP_THI
            })
            console.log("res: " + JSON.stringify(res.data))
            setLH(res.data)
            setOpen(false)
            if(res.data.length == 0){
              toast.error("Nhập mã lớp thi không đúng !", {
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
              <h1>Danh sách lớp thi</h1>
              <form className="wapperHP"onSubmit={handleSubmit}>
                  <h3>Tìm kiếm theo mã lớp thi:</h3>
                  <div className="tim">
                      <input type="search" className='HP'onChange={(e)=>setMA(e.target.value)}placeholder='Nhập dữ liệu vào đây'/>
                      <button className='button_HP'>Search</button>
                  </div>
              </form>
              {
                open ? (
              <Table_LH/>
                ):(
              <Table_LH_Search data= {LH}/>
                )
}
              <ToastContainer />
          </div>
      </div>
      <Footer1/>
  </div>;
};

export default LH_table;
