import React, { useState } from 'react';
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {axiosInstance} from "../../config"
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from '../../Redux/userSlice';
import {Navigate} from 'react-router-dom';


const User = () => {
  const user = useSelector(selectUser);
  console.log('user3: ' + JSON.stringify(user) )
  
  const [Img, setImg] = useState('');
  const [file, setFile] = useState('');
  const [username, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [level, setLevel] = useState('')
  const [MSSV, setMSSV] = useState('')
  const [password, setPass] = useState('')

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

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      if(!username || !email|| !level || !MSSV ||!password ){
        toast.error("Không được để trống dữ liệu !", {
          position: "top-center"
      });
      }else{
        const res = await axiosInstance.post('/auth/register',{
          MSSV, username, email, level, password,Img 
        })
        console.log("res: " + JSON.stringify(res.data))
        toast.success("Tạo thông tin User thành công !", {
          position: "top-center"
      });
    }
    return <Navigate to="/themUser" replace={true}/>
    } catch (error) {
        toast.error("Lỗi không tạo được thông tin !", {
          position: "top-center"
      });
    }
}
console.log('IMG: ' + JSON.stringify(Img))
console.log('file: ' + file)

  return <div className='table_HP'>
      <Navbar/>
      <div className="containerHP">
          <SideBar/>
          <div className="table1">
              <h1>Thêm User</h1>
              <form className="wapperHP1" onSubmit={handleSubmit}>
                  <div className="contai">
                  <div className="con">
                  <label>UserName:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...' onChange={(e)=>setUser(e.target.value)}/>
                  <label>Password:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...'onChange={(e)=>setPass(e.target.value)}/>
                  <label htmlFor="level">Level: </label>
                <select name="level" id="" onChange={(e)=>setLevel(e.target.value)}>
                  <option value=""></option>
                  <option value="Sinh viên">Sinh viên</option>
                  <option value="Giáo viên">Giáo viên</option>
                  <option value="Giáo vụ">Giáo vụ</option>
              </select>
              <label>ID/MSSV:</label>
                  <input type="number" placeholder='Nhập dữ liệu vào đây...' onChange={(e)=>setMSSV(e.target.value)}/>
                  <label>Email:</label>
                  <input type="text" placeholder='Nhập dữ liệu vào đây...' onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="con">
              <label>Tải ảnh từ file:</label>
              <label htmlFor="file">
                   <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                  <input type="file" placeholder='Nhập dữ liệu vào đây...' onChange={(e) => ConvertBase64ToImg(e)}style={{ display: "none" }} id='file'/>
                  <img
              src={
                file
                  ? file
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
              </div>
              </div>
              <button className='sub' type='submit'>Tạo User</button>
              </form>
              <ToastContainer />
          </div>
      </div>
      <Footer1/>
  </div>;
};

export default User;
