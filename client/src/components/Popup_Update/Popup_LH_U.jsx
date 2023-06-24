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


const Popup_LH = ({data,is,SV}) => {
  const [GV, setGV] = useState([])
  const [HP, setHP] = useState([])
 
  React.useEffect(()=>{
    const fetchGV = async ()=>{
      const res = await axiosInstance.get('/teacher_id')
      setGV(res.data)
      console.log("data:" +res.data)
    }
    fetchGV()
  },[])

  React.useEffect(()=>{
    const fetchHP = async ()=>{
      const res = await axiosInstance.get('/subject_id')
      setHP(res.data)
      console.log("data:" +res.data)
    }
    fetchHP()
  },[])

  const [MA_LOP_THI, setMA] = useState('')
  const [TEN_LOP_THI, setTEN] = useState('')
  const [ID, setTD] = useState('')
  const [MA_HP, setMAHP] = useState('')

    const handleUpdate = async ()=>{
       try {
        if(!MA_LOP_THI || !TEN_LOP_THI || !ID ||!MA_HP ){
          toast.error("Không được để trống dữ liệu !", {
            position: "top-center"
        });
        }else{
         const res = await axiosInstance.put(`/classes/${SV[0].MA_LOP_THI}`,{
            MA_LOP_THI, TEN_LOP_THI, ID, MA_HP
          })
           console.log("res: " + JSON.stringify(res.data.code))
           if(res.data.code == 'ER_DUP_ENTRY'){
            toast.info("Mã lớp thi bị trùng !", {
              position: "top-center"
          })
         }else{
            toast.success("Cập nhật lớp thi thành công !", {
              position: "top-center"
          });}
          window.location.reload('/danhsachlopthi')}
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
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Cập nhật thông tin lớp thi </DialogTitle>
             <div className="wapperHP1" style={form} >
             <div className="contai">
                  <div className="con">
                  <label>Mã lớp thi:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setMA(e.target.value)}/>
                  <label>Tên lớp thi:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setTEN(e.target.value)}/>
                  {/* <label htmlFor="level">MSSV: </label> */}
                {/* <select name="level" id=""onChange={(e)=>setMSSV(e.target.value)}>
                <option value=""></option>
                {SV.map((s)=>(
                <option value={s.MSSV}>{s.MSSV} - {s.HO_TEN}</option>
                ))}
              </select> */}
              </div>
              <div className="con">
              {/* <label>Tên học phần:</label> */}
              {/* {TEN_HP1.map((e)=>(
                  <input type="text" readOnly value={e.TEN_HP} />
                  ))} */}
                   {/* <input type="text" placeholder='Nhập dữ liệu vào đây...'/> */}
                  <label htmlFor="level">ID giáo viên: </label>
                <select name="level" id=""onChange={(e)=>setTD(e.target.value)}>
                  <option value=""></option>
                  {GV.map((s)=>(
                <option value={s.ID}>{s.ID} - {s.HO_TEN}</option>
                ))}
              </select>
              <label htmlFor="level">Mã học phần: </label>
                <select name="level" id=""onChange={(e)=>setMAHP(e.target.value)}>
                <option value=""></option>
                  {HP.map((s)=>(
                <option value={s.MA_HP}>{s.MA_HP} - {s.TEN_HP}</option>
                ))}
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

export default Popup_LH;
