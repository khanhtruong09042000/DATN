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


const Popup_LT_U = ({data,is,SV}) => {
  const [LH, setLH] = useState([])
  const [HP, setHP] = useState([])

  React.useEffect(()=>{
    const fetchLH = async ()=>{
      const res = await axiosInstance.get('/class_id')
      setLH(res.data)
      console.log("data:" +res.data)
    }
    fetchLH()
  },[])

  React.useEffect(()=>{
    const fetchHP = async ()=>{
      const res = await axiosInstance.get('/subject_id')
      setHP(res.data)
      console.log("data:" +res.data)
    }
    fetchHP()
  },[])

  const [NGAY_THI, setNT] = useState('')
  const [KY_HOC, setKH] = useState('')
  const [MA_LOP_THI, setMLT] = useState('')
  const [MA_HP, setMAHP] = useState('')
  const [ID, setID] = useState('')

    const handleUpdate = async ()=>{
       try {
           if(!NGAY_THI || !KY_HOC || !MA_LOP_THI ||!MA_HP || !ID){
        toast.error("Không được để trống dữ liệu!", {
          position: "top-center"
      });
      }else{
         const res = await axiosInstance.put(`/schedules/${SV[0].ID}`,{
            MA_LOP_THI, NGAY_THI, MA_LOP_THI, MA_HP,KY_HOC,ID
          })
           console.log("res: " + JSON.stringify(res.data.code))
           if(res.data.code == 'ER_DUP_ENTRY'){
            toast.info("Dữ liệu bị trùng !", {
              position: "top-center"
          })
         }else{
            toast.success("Cập nhật lịch thi thành công !", {
              position: "top-center"
          });}
          window.location.reload('/danhsachlichthi')}
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
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Cập nhật thông tin lịch thi </DialogTitle>
             <div className="wapperHP1" style={form} >
                  <div className="contai">
                  <div className="con">
                  <label>ID:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setID(e.target.value)}/>
                  {/* <label>Tên lớp thi:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'/>
                  <label>Tên học phần:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'/> */}
                  <label>Ngày thi:</label>
                  <input type="date" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setNT(e.target.value)}/>
                  <label htmlFor="level">Mã học phần: </label>
                <select name="level" id=""onChange={(e)=>setMAHP(e.target.value)}>
                <option value=""></option>
                  {HP.map((s)=>(
                <option value={s.MA_HP}>{s.MA_HP} - {s.TEN_HP}</option>
                ))}
              </select>
              </div>
              <div className="con">
              {/* <label>Ngày thi:</label>
                  <input type="date" placeholder='Nhập dữ liệu vào đây...'/> */}
                  <label>Học kì:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setKH(e.target.value)}/>
                  {/* <label htmlFor="level">MSSV: </label>
                <select name="level" id=""onChange={(e)=>setMSSV(e.target.value)}>
                <option value=""></option>
                {SV.map((s)=>(
                <option value={s.MSSV}>{s.MSSV} - {s.HO_TEN}</option>
                ))}
              </select> */}
              <label htmlFor="level">Mã lớp thi: </label>
                <select name="level" id=""onChange={(e)=>setMLT(e.target.value)}>
                <option value=""></option>
                {LH.map((s)=>(
                <option value={s.MA_LOP_THI}>{s.MA_LOP_THI} - {s.TEN_LOP_THI}</option>
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

export default Popup_LT_U;
