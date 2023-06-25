import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import {axiosInstance} from "../../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Popup_LH_U from '../Popup_Update/Popup_LH_U';


const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
 });


const Popup_LH = ({data,is,SV}) => {
  const [open1, setOpen1] = useState(false)

    const handleUpdate = async ()=>{
      setOpen1(true)
      is(false);
    }

    const handleDelete = async (id) =>{
       try {
          await axiosInstance.delete(`/classes/${id}`)
          toast.warning("Lớp thi này đã được xóa !", {
            position: "top-center"
        })
        is(false);
        window.location.replace('/danhsachlopthi')
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
          <Dialog open = {data} TransitionComponent={Transition}>
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Chi tiết lớp thi </DialogTitle>
             {SV.map((s)=>(
             <div className="wapperHP1" style={form} >
             <div className="contai">
                  <div className="con">
                  <label>Mã lớp thi:</label>
                  <input type="number" value={s.MA_LOP_THI} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label>Tên lớp thi:</label>
                  <input type="text" value={s.TEN_LOP_THI} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              </div>
              <div className="con">
                  <label htmlFor="level">ID giáo viên: </label>
                  <input type="text" value={s.ID} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              <label htmlFor="level">Mã học phần: </label>
              <input type="text" value={s.MA_HP} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              </div>
              </div>
              <div className="but" style={but}>
              <button className='sub' type='submit' style={{backgroundColor: 'orange'}}onClick = {()=>handleUpdate()}>Update</button>
              <button className='sub' style={{backgroundColor: 'red'}} onClick = {()=>handleDelete(SV[0].MA_LOP_THI)}>Delete</button>
              <button className='sub' style={{backgroundColor: 'teal'}} onClick = {()=>handleClose()}>Cancel</button>
              </div>
              </div>
             ))}
          </Dialog>
          <Popup_LH_U data = {open1} is={setOpen1} SV = {SV}/>
       </>
    );
};

export default Popup_LH;
