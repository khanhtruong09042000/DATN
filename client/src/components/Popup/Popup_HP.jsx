import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import {axiosInstance} from "../../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Popup_HP_U from '../Popup_Update/Popup_HP_U';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
 });


const Popup_HP = ({data,is,SV}) => {
   const [open1, setOpen1] = useState(false)

    const handleUpdate = async ()=>{
      setOpen1(true)
      is(false);
    }

    const handleDelete = async (id) =>{
       try {
          await axiosInstance.delete(`/subjects/${id}`)
          toast.warning("Học phần đã được xóa !", {
            position: "top-center"
        })
        is(false);
        window.location.replace('/danhsachsinhvien')
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
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Chi tiết học phần </DialogTitle>
             {SV.map((s)=>(
             <div className="wapperHP1" style={form} >
             <label>Mã học phần:</label>
                  <input type="text" value={s.MA_HP} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label>Tên học phần:</label>
                  <input type="text" value={s.TEN_HP} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label htmlFor="level">Yêu cầu TN: </label>
                  <input type="text" value={s.YEU_CAU_TN} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              <label htmlFor="vien">Viện: </label>
              <input type="text" value={s.VIEN} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              <div className="but" style={but}>
              <button className='sub' type='submit' style={{backgroundColor: 'orange'}}onClick = {()=>handleUpdate()}>Update</button>
              <button className='sub' style={{backgroundColor: 'red'}} onClick = {()=>handleDelete(SV[0].MA_HP)}>Delete</button>
              <button className='sub' style={{backgroundColor: 'teal'}} onClick = {()=>handleClose()}>Cancel</button>
              </div>
              </div>
                 ))}
          </Dialog>
          <Popup_HP_U data = {open1} is={setOpen1} SV = {SV}/>
       </>
    );
};

export default Popup_HP;
