import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import {axiosInstance} from "../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
 });


const LT_Popup = ({data,is,SV}) => {

  const [HINH_THUC_THI, setHTT] = useState('')
  const [GIO_THI, setGT] = useState('')

    const handleUpdate = async ()=>{
       try {
         const res = await axiosInstance.put(`/schedule/${SV[0].ID}`,{
          HINH_THUC_THI,GIO_THI
          })
           console.log("res: " + JSON.stringify(res.data.code))
            toast.success("Tạo thông tin lịch thi thành công !", {
              position: "top-center"
          });
          window.location.reload('/dangkihinhthucthi')
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
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Chi tiết lịch thi </DialogTitle>
             {SV.map((s)=>(
             <div className="wapperHP1" style={form} >
             <div className="contai">
                  <div className="con">
                  <label>ID:</label>
                  <input type="number" value={s.ID} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label style={{color:'red'}}>Thời gian thi:</label>
                  <input type="time" onChange={(e)=>setGT(e.target.value)}/>
                  <label>Ngày thi:</label>
                  <input type="text" value={s.NGAY_THI} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label htmlFor="level">Mã học phần: </label>
                  <input type="text" value={s.MA_HP} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              </div>
              <div className="con">
              {/* <label>Ngày thi:</label>
                  <input type="date" placeholder='Nhập dữ liệu vào đây...'/> */}
                  <label>Học kì:</label>
                  <input type="number" value={s.KY_HOC} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label htmlFor="level" style={{color:'red'}}>Hình thức thi: </label>
                <select name="level" id="" onChange={(e)=>setHTT(e.target.value)}>
                <option value=""></option>
                <option value="Trắc nghiệm">Trắc nghiệm</option>
                <option value="Tự luận">Tự luận</option>
                <option value="Vấn đáp">Vấn đáp</option>
               </select>
              <label htmlFor="level">Mã lớp thi: </label>
              <input type="text" value={s.MA_LOP_THI} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              </div>
              </div>
              <div className="but" style={but}>
              <button className='sub' type='submit' style={{backgroundColor: 'orange'}}onClick = {()=>handleUpdate()}>Update</button>
              <button className='sub' style={{backgroundColor: 'teal'}} onClick = {()=>handleClose()}>Cancel</button>
              </div>
              </div>
              ))}
          </Dialog>
       </>
    );
};

export default LT_Popup;
