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


const Popup_HP = ({data,is,SV}) => {
    const [MA_HP, setID] = useState('')
  const [TEN_HP, setName] = useState('')
  const [YEU_CAU_TN, setTN] = useState('')
  const [VIEN, setVIEN] = useState('')

    const handleUpdate = async ()=>{
       try {
         if(!MA_HP || !TEN_HP || !YEU_CAU_TN || !VIEN){
            toast.error("Không được để trống dữ liệu !", {
              position: "top-center"
          });
          }else{
         const res = await axiosInstance.put(`/subjects/${SV[0].MA_HP}`,{
            MA_HP, TEN_HP, YEU_CAU_TN, VIEN
          })
           console.log("res: " + JSON.stringify(res.data.code))
           if(res.data.code == 'ER_DUP_ENTRY'){
            toast.info("Mã học phần bị trùng !", {
              position: "top-center"
          })
         }else{
            toast.success("Cập nhật học phần thành công !", {
              position: "top-center"
          });}
          window.location.reload('/danhsachhocphan')}
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
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Cập nhật thông tin học phần </DialogTitle>
             <div className="wapperHP1" style={form} >
             <label>Mã học phần:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...' onChange={(e)=>setID(e.target.value)}/>
                  <label>Tên học phần:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setName(e.target.value)}/>
                  <label htmlFor="level">Yêu cầu TN: </label>
                <select name="level" id="" onChange={(e)=>setTN(e.target.value)}>
                <option value=""></option>
                  <option value="1">Có</option>
                  <option value="0">Không</option>
              </select>
              <label htmlFor="level">Viện: </label>
                <select name="level" id="" onChange={(e)=>setVIEN(e.target.value)}>
                <option value=""></option>
                  <option value="Điện tử - viễn thông">Điện tử - viễn thông</option>
                  <option value="Công nghệ - thông tin">Công nghệ - thông tin</option>
              </select>
              <div className="but" style={but}>
              <button className='sub' type='submit' style={{backgroundColor: 'skyblue'}}onClick = {()=>handleUpdate()}>Confirm</button>
              <button className='sub' style={{backgroundColor: 'teal'}} onClick = {()=>handleClose()}>Cancel</button>
              </div>
              </div>
          </Dialog>
       </>
    );
};

export default Popup_HP;
