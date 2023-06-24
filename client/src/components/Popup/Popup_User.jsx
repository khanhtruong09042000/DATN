import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from '../../Redux/userSlice';
import {axiosInstance} from "../../config"

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
 });


const LT_Popup = ({data,is}) => {
    const user = useSelector(selectUser);
    const [file, setFile] = useState('');
    const [Img, setImg] = useState(user.Img);
    const [password, setPass] = useState(user.password)
    const username = user.username
    const email = user.email
    const level = user.level
    const MSSV = user.MSSV

    const ConvertBase64ToImg = e =>{
      const file = e.target.files[0]
      const render = new FileReader()
  
      render.onloadend = () =>{
        var t = render.result.toString()
        setFile(t)
        setImg(t)
      }
      render.readAsDataURL(file)
    }

    const handleClose = () => {
       is(false);
    };

    const handleUpdate = async ()=>{
      try {
        const res = await axiosInstance.put(`/user/${user._id}`,{
         username, email, password, level, MSSV, Img
         })
         console.log('res: ' + res.data)
           toast.success("Cập nhật thông tin User thành công !", {
             position: "top-center"
         });
         is(false);
      } catch (error) {
        toast.error("Lỗi không tạo được thông tin !", {
           position: "top-center"
       });
      }
   }

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
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Thông tin của bạn </DialogTitle>
             <div className="wapperHP1" style={form}>
                  <div className="contai">
                  <div className="con">
                  <label>UserName:</label>
                  <input type="text" value={user.username} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label htmlFor="level">Level: </label>
                  <input type="text" value={user.level} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              <label>ID/MSSV:</label>
              <input type="text" value={user.MSSV} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
                  <label>Email:</label>
                  <input type="text" value={user.email} readOnly style={{backgroundColor: 'rgb(226, 223, 223)'}}/>
              </div>
              <div className="con">
              <label style={{color:'red'}}>Tải ảnh từ file:</label>
              <label htmlFor="file">
                   <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                  <input type="file" placeholder='Nhập dữ liệu vào đây...' style={{ display: "none" }} id='file' onChange={(e) => ConvertBase64ToImg(e)}/>
                  <img
              src={
                user.Img || file
                  ? (file ? file : user.Img)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
             <label style={{color:'red'}} >Password:</label>
                  <input type="text" placeholder='Thay đổi mật khẩu tại đây...' onChange={(e)=>setPass(e.target.value)}/>
              </div>
              </div>
              <div className="but" style={but}>
              <button className='sub' type='submit' style={{backgroundColor: 'orange'}} onClick = {()=>handleUpdate()}>Update</button>
              <button className='sub' style={{backgroundColor: 'teal'}} onClick = {()=>handleClose()}>Cancel</button>
              </div>
              </div>
          </Dialog>
       </>
    );
};

export default LT_Popup;
