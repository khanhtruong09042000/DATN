import GV_form from "./pages/GV/GV_form";
import GV_table from "./pages/GV/GV_table";
import Home from "./pages/Home/Home";
import HP_table from "./pages/HP/HP-table";
import HP_form from "./pages/HP/HP_form";
import LH_form from "./pages/LH/LH_form";
import LH_table from "./pages/LH/LH_table";
import Login from "./pages/Login/Login";
import LT_form from "./pages/LT/LT_form";
import LT_table from "./pages/LT/LT_table";
import SV_form from "./pages/SV/SV_form";
import SV_table from "./pages/SV/SV_table";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import User from "./pages/Users/User";
import { productInputs, userInputs } from "./Data";
import User_Admin from "./pages/Users/User_Admin";
import LT from "./pages_GV/LT";
import LH from "./pages_GV/LH";
import LT1 from "./pages_SV/LT";
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from './Redux/userSlice';

function App() {
  const user = useSelector(selectUser);
  console.log('userapp: ' + JSON.stringify(user) )

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/themhocphan' element={<HP_form/>}/>
            <Route path='/danhsachhocphan' element={<HP_table/>}/>
            <Route path='/themsinhvien' element={<SV_form/>}/>
            <Route path='/danhsachsinhvien' element={<SV_table/>}/>
            <Route path='/themgiaovien' element={<GV_form/>}/>
            <Route path='/danhsachgiaovien' element={<GV_table/>}/>
            <Route path='/themlopthi' element={<LH_form/>}/>
            <Route path='/danhsachlopthi' element={<LH_table/>}/>
            <Route path='/sapxeplichthi' element={<LT_form/>}/>
            <Route path='/danhsachlichthi' element={<LT_table/>}/>
            <Route path='/themUser' element={<User inputs={userInputs} title="Add New User"/>}/>
            <Route path='/danhsachUser' element={<User_Admin/>}/>
            <Route path='/dangkihinhthucthi' element={<LT/>}/>
            <Route path='/xemdanhsachlopthi' element={<LH/>}/>
            <Route path='/xemlichthi' element={<LT1/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
