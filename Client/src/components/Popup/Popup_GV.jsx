import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import {axiosInstance} from "../../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Popup_GV_U from '../Popup_Update/Popup_GV_U';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
 });


const Popup_GV = ({data,is,SV}) => {
   const [open1, setOpen1] = useState(false)

    const handleUpdate = async ()=>{
      setOpen1(true)
      is(false);
    }

    const handleDelete = async (id) =>{
       try {
          await axiosInstance.delete(`/teachers/${id}`)
          toast.warning("Giáo viên đã được xóa !", {
            position: "top-center"
        })
        is(false);
        window.location.replace('/danhsachgiaovien')
       } catch (error) {
         toast.error("Lỗi không xóa được thông tin !", {
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
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Chi tiết giáo viên </DialogTitle>
             {SV.map((s)=>(
             <div className="wapperHP1" style={form} >
             <div className="contai">
                  <div className="con">
                  <label>ID:</label>
                  <input type="number" value={s.ID} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label>Họ và tên:</label>
                  <input type="text" value={s.HO_TEN} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label htmlFor="level">Giới tính: </label>
                  <input type="text" value={s.GIOI_TINH} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              </div>
              <div className="con">
              <label>Ngày sinh:</label>
              <input type="text" value={s.NGAY_SINH} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label>SĐT:</label>
                  <input type="text" value={s.SDT} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label>Địa chỉ:</label>
                  <input type="text" value={s.DIA_CHI} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label htmlFor="vien">Viện: </label>
                  <input type="text" value={s.VIEN} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              </div>
              </div>
              <div className="but" style={but}>
              <button className='sub' type='submit' style={{backgroundColor: 'orange'}}onClick = {()=>handleUpdate()}>Update</button>
              <button className='sub' style={{backgroundColor: 'red'}} onClick = {()=>handleDelete(SV[0].ID)}>Delete</button>
              <button className='sub' style={{backgroundColor: 'teal'}} onClick = {()=>handleClose()}>Cancel</button>
              </div>
              </div>
               ))}
          </Dialog>
          <Popup_GV_U data = {open1} is={setOpen1} SV = {SV}/>
       </>
    );
};

export default Popup_GV;
