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


const Popup_GV = ({data,is,SV}) => {
    const [ID, setID] = useState('')
    const [HO_TEN, setHT] = useState('')
    const [GIOI_TINH, setGT] = useState('')
    const [NGAY_SINH, setNS] = useState('')
    const [SDT, setSDT] = useState('')
    const [DIA_CHI, setDC] = useState('')
    const [VIEN, setVIEN] = useState('')

    const handleUpdate = async ()=>{
       try {
         if(!ID || !HO_TEN|| !NGAY_SINH || !SDT ||!DIA_CHI|| !GIOI_TINH || !VIEN ){
            toast.error("Không được để trống dữ liệu !", {
              position: "top-center"
          });
          }else{
         const res = await axiosInstance.put(`/teachers/${SV[0].ID}`,{
            ID, HO_TEN, GIOI_TINH, NGAY_SINH, SDT, DIA_CHI, VIEN
          })
           console.log("res: " + JSON.stringify(res.data.code))
           if(res.data.code == 'ER_DUP_ENTRY'){
            toast.info("ID giáo viên bị trùng !", {
              position: "top-center"
          })
         }else{
            toast.success("Tạo thông tin sinh viên thành công !", {
              position: "top-center"
          });}
          window.location.reload('/danhsachgiaovien')}
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
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Cập nhật thông tin giáo viên </DialogTitle>
             <div className="wapperHP1" style={form} >
             <div className="contai">
                  <div className="con">
                  <label>ID:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setID(e.target.value)}/>
                  <label>Họ và tên:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setHT(e.target.value)}/>
                  <label htmlFor="level">Giới tính: </label>
                <select name="level" id=""onChange={(e)=>setGT(e.target.value)}>
                <option value=""></option>
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

export default Popup_GV;
