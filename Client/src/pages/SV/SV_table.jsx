import React from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import Table_SV from '../../components/Tables/Table_SV';
import Table_SV_Search from '../../components/Tables/Table_SV_Search';
import {axiosInstance} from "../../config"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SV_table = () => {

    const [MSSV, setMSSV] = useState('')
    const [SV, setSV] = useState([])
    const [open, setOpen] = useState(true)
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          if( !MSSV  ){
            setOpen(true)
          }else{
            const res = await axiosInstance.post('/student_mssv',{
               MSSV
            })
            console.log("res: " + JSON.stringify(res.data))
            setSV(res.data)
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
    console.log("SV: " + JSON.stringify(SV))

  return <div className='table_HP'>
      <Navbar/>
      <div className="containerHP">
          <SideBar/>
          <div className="table">
              <h1>Danh sách sinh viên</h1>
              <form className="wapperHP"  onSubmit={handleSubmit}>
                  <h3>Tìm kiếm theo MSSV:</h3>
                  <div className="tim">
                      <input type="search" className='HP'onChange={(e)=>setMSSV(e.target.value)} placeholder='Nhập dữ liệu vào đây'/>
                      <button className='button_HP' type='submit'>Search</button>
                  </div>
              </form>
              {
                open ? (
              <Table_SV/>
                ):(
              <Table_SV_Search data= {SV}/>
                )
}
              <ToastContainer />
          </div>
      </div>
      <Footer1/>
  </div>;
};

export default SV_table;
