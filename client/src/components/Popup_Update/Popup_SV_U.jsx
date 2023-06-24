import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import {axiosInstance} from "../../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
 });


const Popup_SV_U = ({data,is,SV}) => {
    const [MSSV, setMSSV] = React.useState('')
    const [HO_TEN, setHT] = useState('')
    const [GIOI_TINH, setGT] = useState('')
    const [NGAY_SINH, setNS] = useState('')
    const [LOP, setL] = useState('')
    const [DIA_CHI, setDC] = useState('')
    const [VIEN, setVIEN] = useState('')
    console.log('SVccc: '+ JSON.stringify(SV))

    const handleUpdate = async ()=>{
       try {
           if(!MSSV || !HO_TEN|| !NGAY_SINH || !LOP ||!DIA_CHI || !GIOI_TINH || !VIEN){
        toast.error("Không được để trống dữ liệu !", {
          position: "top-center"
      });
      }else{
         const res = await axiosInstance.put(`/students/${SV[0].MSSV}`,{
            MSSV, HO_TEN, GIOI_TINH, NGAY_SINH, LOP, DIA_CHI, VIEN
          })
           console.log("res: " + JSON.stringify(res.data.code))
           if(res.data.code == 'ER_DUP_ENTRY'){
            toast.info("MSSV bị trùng !", {
              position: "top-center"
          })
         }else{
            toast.success("Tạo thông tin sinh viên thành công !", {
              position: "top-center"
          });}
          window.location.reload('/danhsachsinhvien')}
       } catch (error) {
         toast.error("Lỗi không tạo được thông tin !", {
            position: "top-center"
        });
       }
    }

    const handleClose = () => {
       is(false);
    };
    const buttonStyle = {
       width: "10rem",
       fontsize: "1.5rem",
       height: "2rem",
       padding: "5px",
       borderRadius: "10px",
       backgroundColor: "green",
       color: "White",
       border: "2px solid yellow",
    };
    const form = {
      margin: '0px 50px 20px'
    };
    const but = {
       display : 'flex',
       justifyContent: 'space-between'
    };
    return (
       <>
          <Dialog  open = {data} TransitionComponent={Transition}>
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Cập nhật thông tin sinh viên </DialogTitle>
             <div className="wapperHP1" style={form} >
                  <div className="contai">
                  <div className="con">
                  <label>MSSV:</label>
                  <input type="number" onChange={(e)=>setMSSV(e.target.value)}  placeholder='Nhập dữ liệu vào đây...'/>
                  <label>Họ và tên:</label>
                  <input type="text"  onChange={(e)=>setHT(e.target.value)}  placeholder='Nhập dữ liệu vào đây...'/>
                  <label htmlFor="level">Giới tính: </label>
                <select name="level" id="" onChange={(e)=>setGT(e.target.value)} >
                  <option value=""></option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
              </select>
              </div>
              <div className="con">
              <label>Ngày sinh:</label>
                  <input type="date"  onChange={(e)=>setNS(e.target.value)} placeholder='Nhập dữ liệu vào đây...'/>
                  <label>Lớp:</label>
                  <input type="text"  onChange={(e)=>setL(e.target.value)} placeholder='Nhập dữ liệu vào đây...'/>
                  <label>Địa chỉ:</label>
                  <input type="text"  onChange={(e)=>setDC(e.target.value)}  placeholder='Nhập dữ liệu vào đây...'/>
                  <label htmlFor="vien">Viện: </label>
                <select name="vien" id="" onChange={(e)=>setVIEN(e.target.value)} >
                <option value=""></option>
                  <option value="Điện tử - viễn thông">Điện tử - viễn thông</option>
                  <option value="Công nghệ - thông tin">Công nghệ - thông tin</option>
              </select>
              </div>
              </div>
              <div className="but" style={but}>
              <button className='sub' type='submit' style={{backgroundColor: 'skyblue'}}onClick = {()=>handleUpdate()}>Confirm</button>
              <button className='sub' style={{backgroundColor: 'teal'}} onClick = {()=>handleClose()}>Cancel</button>
              </div>
              </div>
          </Dialog>
       </>
    );
};

export default Popup_SV_U;
